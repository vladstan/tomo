import reply from './reply';

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

  const tasks = [];
  const addTask = (receiver, event) => {
    const directReply = (...messages) => reply(event.recipient.id, messages, env.facebookAccessToken);
    let task = receiver(req, event, directReply);

    // Log errors so that other message events are still handled
    task = task.catch((err) => console.error('error trying to handle Facebook event', event, err.stack));
    tasks.push(task);
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

  await Promise.all(tasks);
  return 'ok';
}
