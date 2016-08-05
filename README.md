# ClaireBot

Bot for Real Estate

## Setup

#### Install dependencies

```
npm uninstall -g gulp
npm install -g gulp-cli
npm install
```

#### Creating the function, aliases and permissions

```
# create the function
gulp createFunction --region <region>

# upload the first code version
gulp uploadCode --region <region>

# create an alias (do this for each env)
gulp createAlias --region <region> --env <env>

# allow AWS API Gateway to invoke functions (do this for each env)
gulp addPermissions --region <region> --env <env>
```

#### Updating the function and aliases

```
# upload new code
gulp uploadCode --region <region>

# update an alias
gulp updateAlias --region <region> --env <env>

# update function config
gulp updateConfig --region <region>
```
