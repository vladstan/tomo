import KoaRouter from 'koa-router';

import MainCtrl from 'server/controllers/MainCtrl';
import FacebookCtrl from 'server/controllers/FacebookCtrl';

class Router {

  constructor(config, middleware, logger) {
    const koaRouter = new KoaRouter();
    this.koaRouter = koaRouter;

    new MainCtrl().routes(koaRouter);
    new FacebookCtrl(config, middleware, logger).routes(koaRouter);
  }

  routes() {
    return this.koaRouter.routes();
  }

}

export default Router;
