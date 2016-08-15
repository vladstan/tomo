import EventsHandler from 'facebook/EventsHandler';

class FacebookCtrl {

  constructor(config, middleware, logger) {
    this.config = config;
    this.logger = logger;
    this.verifySignature = middleware.xHubSignature(config.facebookAppSecret);
  }

  routes(koa) {
    koa.get('/facebook', ::this.verifyToken);
    koa.post('/facebook', this.verifySignature, ::this.webhook);
  }

  async verifyToken(ctx) {
    if (ctx.query['hub.mode'] !== 'subscribe') {
      ctx.throw(400, 'unknown hub.mode: ' + ctx.query['hub.mode']);
    }

    const tokenExpected = this.config.facebookVerifyToken;
    const tokenReceived = ctx.query['hub.verify_token'];

    if (tokenReceived !== tokenExpected) {
      ctx.throw(400, 'validation failed, expected ' + tokenExpected + ' but got ' + tokenReceived);
    }

    ctx.body = ctx.query['hub.challenge'];
  }

  async webhook(ctx) {
    const body = ctx.request.body;

    if (body.object !== 'page') {
      ctx.throw(400, 'unknown object type: ' + body.object);
    }

    const eventsBySenderId = this.entriesToGroupedEvents(body.entry);
    const tasks = Object.entries(eventsBySenderId)
      .map(async ([senderId, events]) => {
        await new EventsHandler(this.logger).process(senderId, events);
      });

    await Promise.all(tasks);
    ctx.body = 'ok';
  }

  entriesToGroupedEvents(entries) {
    return entries
      .map((entry) => entry.messaging)
      .reduce((acc, entry) => acc.concat.apply(acc, entry), [])
      .reduce((acc, event) => {
        const senderId = event.sender.id;
        if (!Array.isArray(acc[senderId])) {
          acc[senderId] = [];
        }
        acc[senderId].push(event);
        return acc;
      }, {});
  }

}

export default FacebookCtrl;
