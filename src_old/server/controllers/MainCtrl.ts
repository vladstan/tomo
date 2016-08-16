class MainCtrl {

  routes(koa) {
    koa.get('/', ::this.root);
  }

  async root(ctx) {
    ctx.body = 'ok';
  }

}

export default MainCtrl;
