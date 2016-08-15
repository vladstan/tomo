import TextMessage from 'facebook/messages/TextMessage';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Conversation from 'models/Conversation';
import Memory from 'models/Memory';

import FacebookReply from 'facebook/FacebookReply';
import MessageReceiver from 'facebook/receivers/MessageReceiver';
import PostbackReceiver from 'facebook/receivers/PostbackReceiver';
import WitBot from 'ai/bot/WitBot';

class EventsHandler {

  constructor(config, logger) {
    this.facebookReply = new FacebookReply(config);
    this.messageReceiver = new MessageReceiver();
    this.postbackReceiver = new PostbackReceiver();
    this.witBot = new WitBot(config, logger);
    this.logger = logger;
  }

  async process(senderId, events) {
    this.facebookReply.setSenderId(senderId);
    this.senderId = senderId;

    await this.initDatabaseData();
    this.witBot.init(this.data);

    for (const event of events) {
      await this.processEvent(event); // eslint-disable-line babel/no-await-in-loop
    }

    await this.saveDatabaseData();
  }

  async initDatabaseData() {
    const user = await User.findOneOrCreate({facebookId: this.senderId});
    const session = await Session.findOneOrCreate({userId: user.id});

    const [profile, conversation, memory] = await Promise.all([
      Profile.findOneOrCreate({userId: user.id}),
      Conversation.findOneOrCreate({sessionId: session.id}),
      Memory.findOneOrCreate({sessionId: session.id}),
    ]);

    this.data = {user, session, profile, conversation, memory};
  }

  async saveDatabaseData() {
    const docs = Object.values(this.data);
    const tasks = docs.map((doc) => doc.save());
    await Promise.all(tasks);
  }

  async processEvent(event) {
    try {
      if (event.message) {
        await this.messageReceiver.receive(event, this.facebookReply, this.witBot);
      } else if (event.postback) {
        await this.postbackReceiver.receive(event, this.facebookReply, this.witBot);
      } else {
        this.logger.warn('unknown event type', event);
      }
    } catch (err) {
      this.logger.error('cannot handle event', event, err);
      const responseText = this.witBot.getErrorResponse();
      await this.facebookReply.messages(new TextMessage(responseText));
    }
  }

}

export default EventsHandler;
