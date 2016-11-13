import TextMessage from 'channels/facebook/messages/TextMessage';
import ImageMessage from 'channels/facebook/messages/ImageMessage';
import FacebookReply from 'channels/facebook/FacebookReply';

import Message from 'models/Message';

class MessagesCtrl {

  constructor(config) {
    this.config = config;
    this.facebookReply = new FacebookReply(config);
  }

  routes(koa) {
    koa.post('/messages/read', ::this.markConvRead);
    koa.post('/messages', ::this.sendMessages);
  }

  async markConvRead(ctx) {
    log.silly('marking conv as read');

    const body = ctx.request.body;
    if (!body) ctx.throw(400, 'body required');
    if (!body.receiverFacebookId) ctx.throw(400, 'body.receiverFacebookId is required');
    // TODO use a validation lib?

    log.silly('markConvRead: validation successful, marking...');
    log.silly('markConvRead: setting recipientId =', body.receiverFacebookId);
    this.facebookReply.setRecipientId(body.receiverFacebookId);
    await this.facebookReply.actions('mark_seen');
    log.silly('markConvRead: sent to Facebook');

    ctx.body = 'ok';
  }

  async sendMessages(ctx) {
    log.silly('sending message');

    const body = ctx.request.body;
    if (!body) ctx.throw(400, 'body required');
    if (!body.messages) ctx.throw(400, 'body.messages is required');
    // TODO use a validation lib?

    log.silly('sendMessage: validation successful, processing messages...');
    for (const message of body.messages) {
      log.silly('sendMessage: setting recipientId =', message.receiverFacebookId);
      this.facebookReply.setRecipientId(message.receiverFacebookId);

      log.silly('sendMessage: sending to Facebook');
      if (message.type === 'text') {
        await this.facebookReply.messages(new TextMessage(message.text)); // eslint-disable-line babel/no-await-in-loop
      } else if (message.type === 'image') {
        await this.facebookReply.messages(new ImageMessage(message.imageUrl)); // eslint-disable-line babel/no-await-in-loop
      } else {
        log.debug('MessagesCtrl.send unrecognised message.type:', message.type);
      }

      log.silly('sendMessage: saving to db');
      await new Message(message).save(); // eslint-disable-line babel/no-await-in-loop
    }

    ctx.body = 'ok';
  }

}

export default MessagesCtrl;
