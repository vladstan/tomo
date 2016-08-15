import 'app-module-path/register';

import repl from 'repl';

import Config from 'Config';
import WitBot from 'ai/bot/WitBot';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Conversation from 'models/Conversation';
import Memory from 'models/Memory';

import Database from 'server/Database';
import Logger from 'server/Logger'; // TODO mock, stderr

const config = Config.getInstance();
const logger = new Logger();
const witBot = new WitBot(config, logger);
const database = new Database(config, logger);
database.connect();

let senderId = 123;
let initDone = false;
let data = null;

const replServer = repl.start({
  prompt: '> ',
  eval: (cmd, context, filename, cb) => {
    evalMessage(cmd)
      .then((result) => cb(null, result))
      .catch((err) => cb(err));
  },
});

replServer.on('exit', () => {
  saveDatabaseData()
    .then(() => process.exit(0))
    .catch(errorThrower);
});

init()
  .then(() => {
    initDone = true;
    logger.info('init finished');
  })
  .catch(errorThrower);

function errorThrower(err) {
  logger.error(err);
}

async function init() {
  await initDatabaseData();
  witBot.init(data);
}

async function initDatabaseData() {
  const user = await User.findOneOrCreate({facebookId: senderId});
  const session = await Session.findOneOrCreate({userId: user.id});

  const [profile, conversation, memory] = await Promise.all([
    Profile.findOneOrCreate({userId: user.id}),
    Conversation.findOneOrCreate({sessionId: session.id}),
    Memory.findOneOrCreate({sessionId: session.id}),
  ]);

  data = {user, session, profile, conversation, memory};
}

async function saveDatabaseData() {
  const docs = Object.values(data);
  const tasks = docs.map((doc) => doc.save());
  await Promise.all(tasks);
}

async function evalMessage(cmd) {
  cmd = cmd.trim();
  if (!cmd) {
    return;
  }
  if (!initDone) {
    return '<init not finished>';
  }
  const responses = await witBot.process(cmd);
  return responses.map((resp) => resp.text).join('\n');
}
