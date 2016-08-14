import {dependencies} from 'utils/di';

@dependencies(
  'koa-router',
  'server/controllers/MainCtrl',
  'server/controllers/FacebookCtrl',
)
class Router {

  constructor(koaRouter, mainCtrl, facebookCtrl) {
    mainCtrl.routes(koaRouter);
    facebookCtrl.routes(koaRouter);
    this.koaRouter = koaRouter;
  }

  routes() {
    return this.koaRouter.routes();
  }

}

export default Router;
