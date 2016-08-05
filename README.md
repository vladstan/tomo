# ClaireBot

Bot for Real Estate

## Install dependencies

```
npm uninstall -g gulp
npm install -g gulp-cli
npm install
```

## Deploy to AWS Lambda

```
gulp deploy --region <region> --env <env>
gulp deployClean --region <region> --env <env> # alternative whichs runs `gulp clean` first
```

## Grant permissions

```
gulp deployPermission --region <region> --env <env>
```
