import {repl as nodeRepl} from 'repl';

import Config from 'Config';
import WitBot from 'ai/bot/WitBot';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Conversation from 'models/Conversation';
import Memory from 'models/Memory';

class Repl {

  async init() {
    await this.initDatabaseData();
    const config = Config.getInstance();
    this.witBot = new WitBot(config);
    this.witBot.init(this.data);
    this.senderId = 123;
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

  async evalMessage(cmd) {
    const responses = await this.witBot.process(cmd);
    return responses.map((resp) => resp.text).join('\n');
  }

  async start() {
    await this.init();
    nodeRepl
      .start({
        prompt: '> ',
        eval: (cmd, context, filename, cb) => {
          this.evalMessage(cmd)
            .then((result) => cb(null, result))
            .catch((err) => cb(err));
        },
      })
      .on('exit', () => {
        this.saveDatabaseData()
          .then(() => process.exit(0))
          .catch((err) => {
            throw err;
          });
      });
  }

}

const repl = new Repl();
repl.start().catch((err) => {
  throw err;
});
