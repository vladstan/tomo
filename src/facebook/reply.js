import rp from 'minimal-request-promise';

import {FacebookMessage} from './builder';

class Reply {

  constructor(recipientId, fbAccessToken) {
    this.recipientId = recipientId;
    this.fbAccessToken = fbAccessToken;
  }

  makeReq(body) {
    const options = {
      method: 'POST',
      hostname: 'graph.facebook.com',
      path: '/v2.6/me/messages?access_token=' + this.fbAccessToken,
      port: 443,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    console.info('sending reply', options);
    return rp(options);
  }

  async messages(...messages) {
    const results = [];

    for (let message of messages) {
      if (message instanceof FacebookMessage) {
        message = message.get();
      }

      const body = {
        recipient: {
          id: this.recipientId
        },
        message: message
      };

      // Await in series to ensure messages are sent in order
      const result = await this.makeReq(body); // eslint-disable-line babel/no-await-in-loop
      results.push(result);
    }

    return results;
  }

  async actions(...actions) {
    const results = [];

    for (let action of actions) {
      const body = {
        recipient: {
          id: this.recipientId
        },
        sender_action: action
      };

      // Await in series to ensure actions are sent in order
      const result = await this.makeReq(body); // eslint-disable-line babel/no-await-in-loop
      results.push(result);
    }

    return results;
  }

}

export default Reply;
