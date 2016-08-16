import Koa from 'koa';

class Server {

  constructor(config, router, middleware, logger) {
    this.config = config;
    this.router = router;
    this.middleware = middleware;
    this.logger = logger;

    this.app = new Koa();
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
