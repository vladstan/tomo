import 'app-module-path/register';
import 'utils/longjohn';

import Database from 'server/Database';
import Middleware from 'server/Middleware';
import Server from 'server/Server';
import Router from 'server/Router';

import Config from 'server/Config';
import Logger from 'server/Logger';

// add this to the VERY top of the first file loaded in your app
// TODO var opbeat = require('opbeat').start({
//   appId: 'ca3ca6e078',
//   organizationId: '8ecec125d1f7417886e1c977899a3171',
//   secretToken: '7d9246b410db6e9fa12ca19774a104cb0a112974'
// })

const logger = new Logger();
logger.attachGlobal();

const config = Config.getInstance();
const middleware = new Middleware();
const router = new Router(config, middleware);
const server = new Server(config, router, middleware);
const database = new Database(config);

server.start();
database.connect();

// TODO: fix sourcemaps in babel (?tests)
// TODO: use Map and Set
