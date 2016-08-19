import 'app-module-path/register';

import repl from 'repl';

import Config from 'server/Config';
import WitBot from 'ai/bot/WitBot';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Conversation from 'models/Conversation';
import Memory from 'models/Memory';

import Database from 'server/Database';
import Logger from 'server/Logger'; // TODO mock, stderr

const logger = new Logger();
logger.attachGlobal();

const config = Config.getInstance();

const witBot = new WitBot(config, logger);
const database = new Database(config, logger);
database.connect();

let senderId: number = 123;
let initDone: boolean = false;
let data: ?Object = null;

const replServer = repl.start({
  prompt: '> ',
  eval: (cmd: string, context: any, filename: string, cb: (err: ?Error, result: ?any) => void) => {
    evalMessage(cmd)
      .then((result: any): void => cb(null, result))
      .catch((err: Error): void => cb(err));
  },
});

replServer.on('exit', () => {
  saveDatabaseData()
    .then((): void => process.exit(0))
    .catch(errorThrower);
});

init()
  .then(() => {
    initDone = true;
    logger.info('init finished');
  })
  .catch(errorThrower);

function errorThrower(err: Error) {
  logger.error(err);
}

async function init(): Promise<void> {
  await initDatabaseData();
  witBot.init(data);
}

async function initDatabaseData(): Promise<void> {
  const user = await User.findOneOrCreate({facebookId: senderId});
  const session = await Session.findOneOrCreate({userId: user.id});

  const [profile, conversation, memory] = await Promise.all([
    Profile.findOneOrCreate({userId: user.id}),
    Conversation.findOneOrCreate({sessionId: session.id}),
    Memory.findOneOrCreate({sessionId: session.id}),
  ]);

  data = {user, session, profile, conversation, memory};
}

async function saveDatabaseData(): Promise<void> {
  const docs = Object.values(data);
  const tasks = docs.map((doc) => doc.save());
  await Promise.all(tasks);
}

async function evalMessage(cmd: string) {
  cmd = cmd.trim();
  if (!cmd) {
    return;
  }
  if (!initDone) {
    return '<init not finished>';
  }
  if (cmd.startsWith('@')) {
    const responses = await witBot.postback(cmd.substring(1));
    return responses;
  }
  const responses = await witBot.process(cmd);
  return responses;
}
