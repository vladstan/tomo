import {dependencies} from 'utils/di';

@dependencies(
  'koa',
  'server/Config',
  'server/Router',
  'server/Middleware',
  'server/Logger',
)
class Server {

  constructor(koaApp, config, router, middleware, logger) {
    this.config = config;
    this.router = router;
    this.middleware = middleware;
    this.logger = logger;

    this.app = koaApp;
    this.attachMiddleware();
  }

  attachMiddleware() {
    this.app.use(this.middleware.requestLogger(this.logger));
    this.app.use(this.middleware.bodyParser());
    this.app.use(this.router.routes());
  }

  start() {
    this.app.listen(this.config.port, () => {
      this.logger.info('listening on port %s', this.config.port);
    });
  }

  getApp() {
    return this.app.callback();
  }

}

export default Server;
