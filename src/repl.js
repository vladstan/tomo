import 'app-module-path/register';

import repl from 'repl';

import Config from 'server/Config';
import WitBot from 'ai/bot/WitBot';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Message from 'models/Message';
import ActionMessage from 'models/ActionMessage';
import Memory from 'models/Memory';

import FacebookApi from 'domains/core/FacebookApi';

import Database from 'server/Database';

import Logger from 'server/Logger'; // TODO TEST mock, stderr

const logger = new Logger({silent: false});
logger.attachGlobal();

const config = Config.getInstance();

const witBot = new WitBot(config);
const database = new Database(config);
database.connect();

let senderId: string = '1271264896226433';
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
    log.info('init finished');
  })
  .catch(errorThrower);

function errorThrower(err: Error) {
  log.error(err);
}

async function init(): Promise<void> {
  await initDatabaseData();
  witBot.init(data);
}

async function initDatabaseData(): Promise<void> {
  const user = await User.findOneOrCreate({facebookId: senderId});
  const session = await Session.findOneOrCreate({userId: user.id});

  const [profile, messages, memory] = await Promise.all([
    Profile.findOneOrCreate({userId: user.id}, async () => {
      log.silly('creating new profile for', senderId);
      const facebookApi = FacebookApi.getInstance(config);
      const fields = [
        // 'name',
        'first_name',
        'last_name',
        'profile_pic',
        'gender',
        'locale',
        'timezone',
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

      const fbData = await facebookApi.getUser(senderId, fields);
      log.silly('fbData=', fbData);

      return {
        userId: user.id,
        // name: fbData.name,
        firstName: fbData.first_name,
        lastName: fbData.last_name,
        pictureUrl: fbData.profile_pic,
        gender: fbData.gender,
        locale: fbData.locale,
        timezone: fbData.timezone,
      };
    }),
    Message.find({sessionId: session.id}),
    Memory.findOneOrCreate({sessionId: session.id}),
  ]);

  data = {user, session, profile, messages, memory};
}

async function saveDatabaseData(): Promise<void> {
  data.profile.prefs.fieldNotInModel = 5;
  const docs = [
    data.user,
    data.session,
    data.profile,
    data.memory,
  ];
  const tasks = docs.map((doc, index) => doc.save());
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

  if (cmd === 'exit') {
    saveDatabaseData()
      .then(() => {
        log.silly('database data saved');
        process.exit(0);
      })
      .catch(errorThrower);
    return;
  }

  if (cmd.startsWith('@')) {
    // if (cmd.startsWith('@SEND')) {
    //   const [cmdName, userId, postbackId] = cmd.split();
    //
    // }
    const responses = await witBot.postback(cmd.substring(1));
    return responses;
  }

  if (data.user.botMuted) {
    log.debug('bot is muted for this user, skipping');
    return '<muted>';
  }

  const responses = await witBot.process(cmd);
  if (!responses.length) {
    const actionMessage = new ActionMessage({
      type: 'text',
      userId: data.user.id,
      messageText: cmd,
    });
    await actionMessage.save();
  }
  return responses;
}
