import Koa from 'koa';

class Server {

  constructor(config, router, middleware) {
    this.config = config;
    this.router = router;
    this.middleware = middleware;

    this.app = new Koa();
    this.attachMiddleware();
  }

  attachMiddleware() {
    this.app.use(this.middleware.requestLogger());
    this.app.use(this.middleware.bodyParser());
    this.app.use(this.router.routes());
    // TODO app.use(opbeat.middleware.express())                
  }

  start() {
    this.app.listen(this.config.port, () => {
      log.info('listening on port %s', this.config.port);
    });
  }

  getApp() {
    return this.app.callback();
  }

}

export default Server;
