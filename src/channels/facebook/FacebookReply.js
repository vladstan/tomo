import FacebookMessage from 'channels/facebook/messages/FacebookMessage';
import FacebookApi from 'domains/core/FacebookApi';

class FacebookReply {

  constructor(config) {
    this.facebookApi = FacebookApi.getInstance(config);
  }

  setRecipientId(recipientId) {
    this.recipientId = recipientId;
  }

  async messages(...messages) {
    const results = [];

    for (let message of messages) {
      if (message instanceof FacebookMessage) {
        message = message.get();
      }

      const body = {
        recipient: {
          id: this.recipientId,
        },
        message: message,
      };

      // Await in series to ensure messages are sent in order
      const result = await this.facebookApi.postMessage(body); // eslint-disable-line babel/no-await-in-loop
      results.push(result);
    }

    return results;
  }

  async actions(...actions) {
    const results = [];

    for (const action of actions) {
      const body = {
        recipient: {
          id: this.recipientId,
        },
        sender_action: action,
      };

      // Await in series to ensure actions are sent in order
      const result = await this.facebookApi.postMessage(body); // eslint-disable-line babel/no-await-in-loop
      results.push(result);
    }

    return results;
  }

}

export default FacebookReply;
