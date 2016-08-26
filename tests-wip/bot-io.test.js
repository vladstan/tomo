import test from 'ava';

import Config from 'server/Config';
import WitBot from 'ai/bot/WitBot';

import User from 'models/User';
import Profile from 'models/Profile';
import Session from 'models/Session';
import Conversation from 'models/Conversation';
import Memory from 'models/Memory';

import Database from 'server/Database';

const config = Config.getInstance();

const witBot = new WitBot(config);
const database = new Database(config);
database.connect();

let senderId: string = '100000476749759';
let data: ?Object = null;

test.before(async (t) => {
  await initDatabaseData();
  witBot.init(data);
});

test('hello', async (t) => {
  const responses = await witBot.process('hello');
  t.truthy(responses[0]);
  t.deepEqual(responses[0].type, 'text');
});

test('i want an apartment', async (t) => {
  const responses = await witBot.process('i want an apartment');
  t.truthy(responses[0]);
  t.deepEqual(responses[0].type, 'text');
  t.truthy(responses[1]);
  t.deepEqual(responses[1].type, 'card');
});

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
