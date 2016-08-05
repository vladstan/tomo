import rp from 'minimal-request-promise';

import {FacebookMessage} from './builder';

export default async function(recipientId, messages, fbAccessToken) {
  const results = [];

  for (let message of messages) {
    if (message instanceof FacebookMessage) {
      message = message.get();
    }

    const options = {
      method: 'POST',
      hostname: 'graph.facebook.com',
      path: '/v2.6/me/messages?access_token=' + fbAccessToken,
      port: 443,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        recipient: {
          id: recipientId
        },
        message: message
      })
    };

    console.info('sending reply', options);
    // Await in series to ensure messages are sent in order
    const result = await rp(options); // eslint-disable-line babel/no-await-in-loop
    results.push(result);
  }

  return results;
}
