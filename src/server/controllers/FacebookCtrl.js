import {dependencies} from 'utils/di';

@dependencies(
  'server/Config',
  'server/Middleware',
  'server/Logger',
)
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

    // const eventsBySenderId = body.entry
    //   .map((entry) => entry.messaging)
    //   .reduce((acc, entry) => acc.concat.apply(acc, entry), [])
    //   .reduce((acc, event) => {
    //     const senderId = event.sender.id;
    //     if (!Array.isArray(acc[senderId])) {
    //       acc[senderId] = [];
    //     }
    //     acc[senderId].push(event);
    //     return acc;
    //   }, {});

    // const tasks = Object.keys(eventsBySenderId).map(async (senderId) => {
    //   const reply = new Reply(senderId, config.facebookAccessToken);
    //   const witApi = new WitAiApi(config.witAiAccessToken);
    //
    //   const user = await User.findOneOrCreate({facebookId: senderId});
    //   const session = await Session.findOneOrCreate({userId: user.id});
    //   await Conversation.findOneOrCreate({sessionId: session.id});
    //   await Profile.findOneOrCreate({userId: user.id});
    //
    //   const bot = new WitBot(user.id, witApi);
    //   await bot.wakeUp();
    //
    //   for (const event of eventsBySenderId[senderId]) {
    //     try {
    //       if (event.message) {
    //         await receiverMessage(event, reply, bot); // eslint-disable-line babel/no-await-in-loop
    //       } else if (event.postback) {
    //         await receiverPostback(event, reply, bot); // eslint-disable-line babel/no-await-in-loop
    //       } else {
    //         this.logger.warn('unknown event type', event);
    //       }
    //     } catch (err) {
    //       this.logger.error('cannot handle event', event, err);
    //       await reply.messages(new TextMessage('Beep boop, error')); // eslint-disable-line babel/no-await-in-loop
    //     }
    //   }
    //
    //   await bot.sleep();
    // });
    //
    // await Promise.all(tasks);
    ctx.body = 'ok';
  }

}

export default FacebookCtrl;

// import WitAiApi from '../apis/WitAiApi';
// import WitBot from '../bot/WitBot';
//
// import {TextMessage} from '../facebook/messages';
// import Reply from '../facebook/reply';
//
// import User from '../models/User';
// import Session from '../models/Session';
// import Profile from '../models/Profile';
// import Conversation from '../models/Conversation';
//
// import receiverMessage from '../facebook/receivers/message';
// import receiverPostback from '../facebook/receivers/postback';
//
//
//
// export async function verifyToken(ctx) {
//
// }
