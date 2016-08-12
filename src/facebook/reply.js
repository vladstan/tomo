import {FacebookMessage} from './messages';
import FacebookApi from '../apis/facebook';

class Reply {

  constructor(recipientId, accessToken) {
    this.recipientId = recipientId;
    this.api = new FacebookApi(accessToken);
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
      const result = await this.api.postMessage(body); // eslint-disable-line babel/no-await-in-loop
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
      const result = await this.api.postMessage(body); // eslint-disable-line babel/no-await-in-loop
      results.push(result);
    }

    return results;
  }

}

export default Reply;
