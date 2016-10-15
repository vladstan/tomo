import TextMessage from 'channels/facebook/messages/TextMessage';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Message from 'models/Message';
import Memory from 'models/Memory';

import FacebookApi from 'domains/core/FacebookApi';
import FacebookReply from 'channels/facebook/FacebookReply';
import EventReceiver from 'channels/facebook/EventReceiver';
import WitBot from 'ai/bot/WitBot';

class EventsHandler {

  constructor(config) {
    this.facebookApi = FacebookApi.getInstance(config);
    this.facebookReply = new FacebookReply(config);
    this.eventReceiver = new EventReceiver();
    this.witBot = new WitBot(config);
  }

  async process(senderId, events) {
    this.facebookReply.setRecipientId(senderId);
    this.senderId = senderId;

    await this.initDatabaseData();

    if (this.data.user.botMuted) {
      log.debug('bot is muted for this user, skipping WitBot processing');
      for (const event of events) {
        if (event.message && event.message.text) {
          const msg = {
            type: 'text',
            senderType: 'user',
            receiverType: 'bot',
            senderId: this.data.user.id,
            receiverId: '0bot0',
            text: event.message.text, //
            sessionId: this.data.session.id,
          };
          await new Message(msg).save(); // eslint-disable-line babel/no-await-in-loop
        } else {
          log.silly('event does not have event.message.text:', JSON.stringify(event));
        }
        // TODO: do this in REPL as well ??
      }
      return;
    }

    this.witBot.init(this.data);

    for (const event of events) {
      await this.processEvent(event); // eslint-disable-line babel/no-await-in-loop
    }

    await this.saveDatabaseData();
  }

  async initDatabaseData() {
    const user = await User.findOneOrCreate({facebookId: this.senderId});
    const session = await Session.findOneOrCreate({userId: user.id});

    const [profile, messages, memory] = await Promise.all([
      Profile.findOneOrCreate({userId: user.id}, async () => {
        log.silly('creating new profile for', this.senderId);
        const fields = [
          // 'name',
          'first_name',
          'last_name',
          'profile_pic',
          'gender',
          // 'locale',
          // 'timezone',
          // 'updated_time',
          // 'age_range',
          // 'birthday',
          // 'currency',
          // 'hometown',
          // 'interested_in',
          // 'languages',
          // 'location',
          // 'devices',
        ];

        const fbData = await this.facebookApi.getUser(this.senderId, fields);
        log.silly('fbData=', fbData);

        return {
          userId: user.id,
          // name: fbData.name,
          firstName: fbData.first_name,
          lastName: fbData.last_name,
          pictureUrl: fbData.profile_pic,
          gender: fbData.gender,
        };
      }),
      Message.find({sessionId: session.id}),
      Memory.findOneOrCreate({sessionId: session.id}),
    ]);

    this.data = {user, session, profile, messages, memory};
  }

  async saveDatabaseData() {
    const docs = [
      this.data.user,
      this.data.session,
      this.data.profile,
      this.data.memory,
    ];
    const tasks = docs.map((doc) => doc.save());
    await Promise.all(tasks);
  }

  async processEvent(event) {
    log.silly('processing event', JSON.stringify(event));
    try {
      await this.eventReceiver.receive(event, this.facebookReply, this.witBot, this.data);
    } catch (err) {
      log.error('cannot handle event'); // TODO log response body, too
      log.error(err);

      try {
        const errorResponseText = this.witBot.getErrorResponse();
        await this.facebookReply.messages(new TextMessage(errorResponseText));
      } catch (err) {
        log.error('cannot send error message back to user'); // TODO log response body, too
        log.error(err);
      }
    }
  }

}

export default EventsHandler;
