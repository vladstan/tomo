import 'app-module-path/register';

import Database from 'server/Database';
import Middleware from 'server/Middleware';
import Server from 'server/Server';
import Router from 'server/Router';

import Config from 'server/Config';
import Logger from 'server/Logger';

if (process.env.NODE_ENV !== 'production') {
  require('longjohn');
}

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
