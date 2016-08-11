import Dynasty from 'dynasty';
import {Wit} from 'node-wit';
import OpenWeather from 'node-openweather';
import {Text} from './builder';

import Actions from './actions';
import Reply from './reply';

import receiverMessage from './receivers/message';
import receiverPostback from './receivers/postback';

export function main() {
  return 'ok';
}

export async function verifyToken({query, env}) {
  if (query['hub.mode'] !== 'subscribe') {
    throw new Error('unknown hub.mode: ' + query['hub.mode']);
  }

  const tokenExpected = env.facebookVerifyToken;
  const tokenReceived = query['hub.verify_token'];

  if (tokenReceived !== tokenExpected) {
    throw new Error('validation failed, expected ' + tokenExpected + ' but got ' + tokenReceived);
  }

  return query['hub.challenge'];
}

export async function webhook(req) {
  const {body, env} = req;

  if (body.object !== 'page') {
    throw new Error('unknown object type: ' + body.object);
  }

  const tasks = {};
  const addTask = (receiver, event) => {
    const senderId = event.sender.id;
    const reply = new Reply(senderId, env.facebookAccessToken);

    const openWeather = new OpenWeather({
      key: env.openWeatherApiKey,
      accuracy: 'like',
      units: 'metric',
      language: 'en'
    });

    const db = new Dynasty({}).table('claireBotData');
    db.findOrInsert = async (selector, defaultDoc) => {
      let doc = await db.find(selector);
      if (!doc) {
        doc = await db.insert(defaultDoc);
      }
      return doc;
    };

    const wit = new Wit({
      accessToken: env.witAiAccessToken,
      actions: new Actions(reply, db, openWeather).getActions()
    });

    const task = receiver(req, event, reply, wit, db)
      .catch((err) => {
        console.error('error trying to handle Facebook event', event, err, err.stack);
        return reply.messages(new Text('Beep boop, error.'));
      });

    tasks[senderId] = tasks[senderId] || [];
    tasks[senderId].push(task);
  };

  for (let entry of body.entry) {
    for (let event of entry.messaging) {
      if (event.message) {
        addTask(receiverMessage, event);
      } else if (event.postback) {
        addTask(receiverPostback, event);
      } else {
        console.error('unknown event type:', event);
      }
    }
  }

  const tasksById = Object.keys(tasks).map((senderId) => {
    return (async () => {
      for (let task of tasks[senderId]) {
        await task;  // eslint-disable-line babel/no-await-in-loop
      }
    })();
  });

  await Promise.all(tasksById);
  return 'ok';
}
