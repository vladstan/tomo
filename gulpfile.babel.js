import {series, parallel, src, dest} from 'gulp';

import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import zip from 'gulp-zip';

import npmi from 'npmi';
import uuid from 'node-uuid';
import aws from 'aws-sdk-promise';
import minimist from 'minimist';
import fs from 'fs.promised';
import del from 'del';

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

function getRegion() {
  const args = getArgs();
  if (!args.region) {
    throw new Error('--region parameter is required');
  }
  return args.region;
}

function getEnv() {
  const args = getArgs();
  if (!['development', 'staging', 'production'].includes(args.env)) {
    throw new Error('--env parameter is required (development, staging, or production)');
  }
  return args.env;
}

function getLambdaJson() {
  return require('./aws/lambda.json');
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

async function lambdaCreateFunction() {
  const lambda = getLambda({
    region: getRegion()
  });

  const response = await lambda.createFunction({
    ...getLambdaJson(),
    Code: {
      ZipFile: await fs.readFile('./dist/app.zip')
    },
    Publish: true
  }).promise();

  console.log(response.data);
}

async function lambdaUploadCode() {
  const lambda = getLambda({
    region: getRegion()
  });

  const response = await lambda.updateFunctionCode({
    FunctionName: getLambdaJson().FunctionName,
    ZipFile: await fs.readFile('./dist/app.zip'),
    Publish: true
  }).promise();

  console.log(response.data);
}

async function lambdaUpdateConfig() {
  const lambda = getLambda({
    region: getRegion()
  });

  const params = getLambdaJson();
  const response = await lambda.updateFunctionConfiguration(params).promise();

  console.log(response.data);
}

async function lambdaCreateAlias() {
  const lambda = getLambda({
    region: getRegion()
  });

  const response = await lambda.createAlias({
    FunctionName: getLambdaJson().FunctionName,
    FunctionVersion: '$LATEST',
    Name: getEnv()
  }).promise();

  console.log(response.data);
}

async function lambdaUpdateAlias() {
  const lambda = getLambda({
    region: getRegion()
  });

  const response = await lambda.updateAlias({
    FunctionName: getLambdaJson().FunctionName,
    FunctionVersion: '$LATEST',
    Name: getEnv()
  }).promise();

  console.log(response.data);
}

async function lambdaAddPermissions() {
  const lambda = getLambda({
    region: getRegion()
  });

  const response1 = await lambda.getAlias({
    FunctionName: getLambdaJson().FunctionName,
    Name: getEnv()
  }).promise();

  const response2 = await lambda.addPermission({
    Action: 'lambda:InvokeFunction',
    FunctionName: response1.data.AliasArn,
    Principal: 'apigateway.amazonaws.com',
    StatementId: uuid.v4()
  }).promise();

  console.log(response2.data);
}

const clean = parallel(cleanBuild, cleanDist);
const build = series(lintJs, compileJs);
const deploy = series(
  parallel(
    series(build, distCopyJs),
    series(distCopyPackageJson, distInstallDeps)
  ),
  distArchive
);
const createFunction = series(deploy, lambdaCreateFunction);
const uploadCode = series(deploy, lambdaUploadCode);
const updateConfig = lambdaUpdateConfig;
const createAlias = lambdaCreateAlias;
const updateAlias = lambdaUpdateAlias;
const addPermissions = lambdaAddPermissions;

// EXPORTS

export {cleanBuild, cleanDist, clean};
export {lintJs, compileJs, build, deploy};
export {createFunction, uploadCode, updateConfig};
export {createAlias, updateAlias, addPermissions};
