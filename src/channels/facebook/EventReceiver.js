import TextMessage from 'channels/facebook/messages/TextMessage';
import GenericMessage from 'channels/facebook/messages/GenericMessage';
import ImageMessage from 'channels/facebook/messages/ImageMessage';

import ActionMessage from 'models/ActionMessage';
import Message from 'models/Message';
import Trip from 'models/Trip';

class EventReceiver {

  async receive(event, reply, bot, data) {
    await reply.actions('mark_seen');
    await this.handleUnsupportedLanguages(event, reply);

    // send responses (if any)
    const botResponses = await this.getBotResponses(event, bot);
    if (botResponses.length) {
      const fbReplies = [];
      this.botResponsesToFbReplies(botResponses, fbReplies);
      if (fbReplies.length) {
        await reply.actions('typing_on');
        await reply.messages(...fbReplies);
        return;
      }
    }

    // save a suggestion choice for a trip
    if (await this.saveSuggestion(event)) {
      return;
    }

    // no responses, send fallback reply
    await this.sendFallbackReply(reply, data);
    await this.saveFallbackActionMessage(this.getFallbackMessageText(event), data);
  }

  async handleUnsupportedLanguages(event, reply) {
    if (event.message && event.message.text === 'Empezar') {
      await reply.messages(new TextMessage('Lo siento, no hablo español, sólo el Inglés'));
    }
  }

  async saveSuggestion(event) {
    const {postback} = event;

    if (postback && postback.payload) {
      if (postback.payload.startsWith('BOOK_FLIGHT:')) {
        const payloadData = JSON.parse(postback.payload.substr('BOOK_FLIGHT:'.length));
        const {tripId} = payloadData;

        const trip = await Trip.findOne({_id: tripId});
        if (!trip) {
          throw new Error('trip not found for id: ' + tripId);
        }

        const objDoc = {
          pictureUrl: payloadData.pictureUrl,
          airline: payloadData.airline,
          price: payloadData.price,
        };

        await Trip.update({_id: tripId}, {'$push': {'flights': objDoc}});
        return true;
      }

      if (postback.payload.startsWith('BOOK_ACCOMMODATION:')) {
        const payloadData = JSON.parse(postback.payload.substr('BOOK_ACCOMMODATION:'.length));
        const {tripId} = payloadData;

        const trip = await Trip.findOne({_id: tripId});
        if (!trip) {
          throw new Error('trip not found for id: ' + tripId);
        }

        const objDoc = {
          link: payloadData.link,
          pictureUrl: payloadData.pictureUrl,
          name: payloadData.name,
          price: payloadData.price,
        };

        await Trip.update({_id: tripId}, {'$push': {'accommodation': objDoc}});
        return true;
      }

      if (postback.payload.startsWith('BOOK_ACTIVITY:')) {
        log.debug('postback.payload.startsWith(BOOK_ACTIVITY:)');

        const payloadData = JSON.parse(postback.payload.substr('BOOK_ACTIVITY:'.length));
        const {tripId} = payloadData;

        // log.debug('payloadData=', JSON.stringify(payloadData));
        // log.debug('payloadDataFields=', Object.keys(payloadData));
        // log.debug('tripId=', JSON.stringify(payloadData.tripId));

        const trip = await Trip.findOne({_id: tripId});
        console.log('trip=', JSON.stringify(trip));
        if (!trip) {
          throw new Error('trip not found for id: ' + tripId);
        }

        const objDoc = {
          pictureUrl: payloadData.pictureUrl,
          name: payloadData.name,
          price: payloadData.price,
        };

        await Trip.update({_id: tripId}, {'$push': {'activities': objDoc}});
        return true;
      }
    }

    return false;
  }

  getFallbackMessageText(event) {
    if (event.message) {
      const {message} = event;
      return message.text ||
        (message.quick_reply && message.quick_reply.payload && ('@' + message.quick_reply.payload)) ||
        (message.attachments && '<message with attachments>') ||
        '<message>';
    }

    if (event.postback) {
      const {postback} = event;
      return (postback.payload && ('@' + postback.payload)) || '<postback>';
    }

    return '<unrecognised message>';
  }

  async getBotResponses(event, bot) {
    const {message = {}, postback = {}} = event;
    const botResponses = [];

    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
    if (message.quick_reply && message.quick_reply.payload) {
      const responses = await bot.postback(message.quick_reply.payload, message.text, event);
      botResponses.push(...responses);
    }

    if (!botResponses.length && message.text) {
      const responses = await bot.process(message.text, event);
      botResponses.push(...responses);
    }

    // https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
    if (!botResponses.length && postback.payload) {
      const responses = await bot.postback(postback.payload, '@' + postback.payload, event);
      botResponses.push(...responses);
    }

    return botResponses;
  }

  botResponsesToFbReplies(botResponses, fbReplies) {
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
  }

  async sendFallbackReply(reply, data) {
    const fallbackTextMsg1 = new TextMessage("I don't know how to do that yet");
    const fallbackTextMsg2 = new TextMessage("I'll notify my humans about it");

    const getDocForMsg = (msgText) => ({
      type: 'text',
      senderType: 'bot',
      receiverType: 'user',
      senderId: '0bot0',
      receiverId: data.user.id,
      sessionId: data.session.id,
      text: msgText,
      entities: {},
    });

    await reply.messages(fallbackTextMsg1, fallbackTextMsg2);
    await new Message(getDocForMsg(fallbackTextMsg1.text)).save();
    await new Message(getDocForMsg(fallbackTextMsg2.text)).save();
  }

  async saveFallbackActionMessage(messageText, data) {
    const query = {userId: data.user.id};
    const newDoc = {
      type: 'text',
      userId: data.user.id,
      messageText: messageText,
    };
    const actionMsg = await ActionMessage.findOneOrCreate(query, async () => newDoc); // eslint-disable-line babel/no-await-in-loop
    if (actionMsg.messageText !== messageText) {
      actionMsg.messageText = messageText;
      await actionMsg.save(); // eslint-disable-line babel/no-await-in-loop
    }
  }

}

export default EventReceiver;
