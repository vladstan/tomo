import KoaRouter from 'koa-router';

import MainCtrl from 'server/controllers/MainCtrl';
import FacebookCtrl from 'server/controllers/FacebookCtrl';

import Config from 'server/Config';
import Middleware from 'server/Middleware';

class Router {

  koaRouter: KoaRouter;
  config: Config;

  constructor(config: Config, middleware: Middleware) {
    const koaRouter = new KoaRouter();
    this.koaRouter = koaRouter;

    new MainCtrl().routes(koaRouter);
    new FacebookCtrl(config, middleware).routes(koaRouter);
  }

  routes() {
    return this.koaRouter.routes();
  }

}

export default Router;
