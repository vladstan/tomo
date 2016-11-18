import TextMessage from 'channels/facebook/messages/TextMessage';
import GenericMessage from 'channels/facebook/messages/GenericMessage';
import ImageMessage from 'channels/facebook/messages/ImageMessage';
import FacebookReply from 'channels/facebook/FacebookReply';

import Message from 'models/Message';

class MessagesCtrl {

  constructor(config) {
    this.config = config;
    this.facebookReply = new FacebookReply(config);
  }

  routes(koa) {
    koa.post('/typing_status', ::this.setTypingStatus);
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

  async setTypingStatus(ctx) {
    log.silly('setting typing status');

    const body = ctx.request.body;
    if (!body) ctx.throw(400, 'body required');
    if (!body.receiverFacebookId) ctx.throw(400, 'body.receiverFacebookId is required');
    if (typeof body.isTyping !== 'boolean') ctx.throw(400, 'body.isTyping is required (must be boolean)');
    // TODO use a validation lib?

    log.silly('setTypingStatus: validation successful, setting...');
    log.silly('setTypingStatus: setting recipientId =', body.receiverFacebookId);
    this.facebookReply.setRecipientId(body.receiverFacebookId);
    if (body.isTyping) {
      await this.facebookReply.actions('typing_on');
    } else {
      await this.facebookReply.actions('typing_off');
    }
    log.silly('setTypingStatus: sent to Facebook');

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
      } else if (message.type === 'cards') {
        let genericMessage = new GenericMessage();

        for (const card of message.cards) {
          genericMessage = genericMessage
            .addBubble(card.title, (card.description || '').substr(0, 80))
            .addUrl(card.link)
            .addImage(card.pictureUrl);

          for (const btn of card.buttons) {
            genericMessage = genericMessage
              .addButton(btn.title, btn.url || btn.payload);
          }
        }

        await this.facebookReply.messages(genericMessage); // eslint-disable-line babel/no-await-in-loop
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
