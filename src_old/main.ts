import Database from 'server/Database';
import Middleware from 'server/Middleware';
import Server from 'server/Server';
import Router from 'server/Router';

import Config from 'Config';
import Logger from 'server/Logger';

const config = Config.getInstance();
const middleware = new Middleware();
const logger = new Logger();

const router = new Router(config, middleware, logger);

const server = new Server(config, router, middleware, logger);
const database = new Database(config, logger);

server.start();
database.connect();
