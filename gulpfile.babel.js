import {series, parallel, src, dest} from 'gulp';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import zip from 'gulp-zip';

import npmi from 'npmi';
import aws from 'aws-sdk-promise';
import minimist from 'minimist';
import fs from 'fs.promised';
import del from 'del';

import lambdaJson from './aws/lambda.json';

// UTILS

let _args = null;
let _lambda = null;

function getArgs() {
  if (!_args) {
    _args = minimist(process.argv.slice(2));
  }
  return _args;
}

function getLambda(options) {
  if (!_lambda) {
    options.apiVersion = options.apiVersion || '2015-03-31';
    _lambda = new aws.Lambda(options);
  }
  return _lambda;
}

// TASKS

function cleanBuild() {
  return del(['build']);
}

function cleanDist() {
  return del(['dist']);
}

function lintJs() {
  return src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function compileJs() {
  return src('./src/**')
    .pipe(babel())
    .pipe(dest('./build'));
}

function distCheckParams(done) {
  if (!getArgs().region) {
    throw new Error('--region parameter is required');
  }

  if (!['development', 'staging', 'production'].includes(getArgs().env)) {
    throw new Error('--env parameter is required (development, staging, or production)');
  }

  done();
}

function distCopyJs() {
  return src('./build/**').pipe(dest('./dist/app/js'));
}

function distCopyPackageJson() {
  return src('./package.json').pipe(dest('./dist/app'));
}

function distInstallDeps(done) {
  npmi({
    path: './dist/app',
    npmLoad: {
      production: true,
      progress: false
    }
  }, done);
}

function distArchive() {
  return src('./dist/app/**')
    .pipe(zip('app.zip'))
    .pipe(dest('./dist'));
}

async function distUpload() {
  const region = getArgs().region;
  const lambda = getLambda({region});

  try {
    await getFunction();
    await uploadExisting();
  } catch (err) {
    if (err.statusCode === 404) {
      await uploadNew();
    } else {
      throw err;
    }
  }

  const response = await getFunction();
  console.log(response.data);

  function getFunction() {
    return lambda.getFunction({FunctionName: lambdaJson.FunctionName}).promise();
  }

  async function uploadNew() {
    await lambda.createFunction({
      ...lambdaJson,
      Code: {
        ZipFile: await fs.readFile('./dist/app.zip')
      },
      Publish: true
    }).promise();
  }

  async function uploadExisting() {
    await lambda.updateFunctionCode({
      FunctionName: lambdaJson.FunctionName,
      ZipFile: await fs.readFile('./dist/app.zip'),
      Publish: true
    }).promise();
    await lambda.updateFunctionConfiguration(lambdaJson).promise();
  }
}

async function distAlias() {
  const region = getArgs().region;
  const distEnv = getArgs().env;
  const lambda = getLambda({region});

  try {
    await getAlias();
    await updateExisting();
  } catch (err) {
    if (err.statusCode === 404) {
      await createNew();
    } else {
      throw err;
    }
  }

  const response = await getAlias();
  console.log(response.data);

  function getAlias() {
    return lambda.getAlias({
      FunctionName: lambdaJson.FunctionName,
      Name: distEnv
    }).promise();
  }

  async function createNew() {
    await lambda.createAlias({
      FunctionName: lambdaJson.FunctionName,
      FunctionVersion: '$LATEST',
      Name: distEnv
    }).promise();
  }

  async function updateExisting() {
    await lambda.updateAlias({
      FunctionName: lambdaJson.FunctionName,
      FunctionVersion: '$LATEST',
      Name: distEnv
    }).promise();
  }
}

const clean = parallel(cleanBuild, cleanDist);
const build = series(lintJs, compileJs);
const deploy = series(
  distCheckParams,
  parallel(
    series(build, distCopyJs),
    series(distCopyPackageJson, distInstallDeps)
  ),
  distArchive,
  distUpload,
  distAlias
);
const deployClean = series(clean, deploy);

// EXPORTS

export {cleanBuild, cleanDist, clean};
export {lintJs, compileJs};
export {build, deploy, deployClean};
