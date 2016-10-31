import TextMessage from 'channels/facebook/messages/TextMessage';
import GenericMessage from 'channels/facebook/messages/GenericMessage';
import ImageMessage from 'channels/facebook/messages/ImageMessage';

import ActionMessage from 'models/ActionMessage';

class EventReceiver {

  async receive({message = {}, postback = {}}, reply, bot, data) {
    await reply.actions('mark_seen', 'typing_on');

    const fbReplies = [];
    const botResponses = [];

    if (message.text === 'Empezar') {
      await reply.messages(new TextMessage('Lo siento, no hablo español, sólo el Inglés'));
    }

    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
    if (message.quick_reply && message.quick_reply.payload) {
      const responses = await bot.postback(message.quick_reply.payload, message.text);
      botResponses.push(...responses);
    }

    if (!botResponses.length && message.text) {
      const responses = await bot.process(message.text);
      botResponses.push(...responses);
    }

    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
    if (!botResponses.length && postback.payload) {
      const responses = await bot.postback(postback.payload, '@' + postback.payload);
      botResponses.push(...responses);
    }

    if (!botResponses.length && message.attachments) {
      // TODO message.attachments
    }

    if (botResponses.length) {
      botResponses
        .filter((resp) => resp.type === 'text')
        .forEach((resp) => {
          let qr = new TextMessage(resp.text);
          if (Array.isArray(resp.quickReplies)) {
            for (const quickReply of resp.quickReplies) {
              qr = qr.addQuickReply(quickReply.text, quickReply.postbackId); // TODO rename postback -> payload?
            }
          }
          fbReplies.push(qr);
        });

      botResponses
        .filter((resp) => resp.type === 'image')
        .forEach((resp) => {
          fbReplies.push(new ImageMessage(resp.url));
        });

      const genericReply = botResponses
        .filter((resp) => resp.type === 'card')
        .reduce((genericMessage, resp) => {
          return genericMessage
            .addBubble(resp.name, resp.description.substr(0, 80))
            .addUrl(resp.url)
            .addImage(resp.img)
            .addButton(resp.button, resp.url)
            .addButton('Talk to a human', 'ONBOARDING_HUMAN');
        }, new GenericMessage()); // TODO send them as a single botResponse
      if (genericReply.bubbles.length) {
        fbReplies.push(genericReply);
      }

      if (fbReplies.length) {
        await reply.messages(...fbReplies);
        return;
      }
    }

    const fallbackTextMsg1 = new TextMessage("I don't know how to do that yet");
    const fallbackTextMsg2 = new TextMessage("I'll notify my humans about it");

    await reply.messages(fallbackTextMsg1, fallbackTextMsg2);

    const query = {userId: data.user.id};
    const newDoc = {
      type: 'text',
      userId: data.user.id,
      messageText: message.text,
    };
    const actionMsg = await ActionMessage.findOneOrCreate(query, async () => newDoc); // eslint-disable-line babel/no-await-in-loop
    if (actionMsg.messageText !== message.text) {
      actionMsg.messageText = message.text;
      await actionMsg.save(); // eslint-disable-line babel/no-await-in-loop
    }
  }

}

export default EventReceiver;
