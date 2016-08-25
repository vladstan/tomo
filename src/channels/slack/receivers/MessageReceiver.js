import TextMessage from 'facebook/messages/TextMessage';
import GenericMessage from 'facebook/messages/GenericMessage';
import ImageMessage from 'facebook/messages/ImageMessage';

class MessageReceiver {

  async receive(event, reply, bot) {
    const message = event.message;
    await reply.actions('mark_seen', 'typing_on');

    const fbReplies = [];
    let botReplies = null;

    if (message.quick_reply && message.quick_reply.payload && message.quick_reply.payload !== 'DUMMY') {
      botReplies = await bot.postback(message.quick_reply.payload);
    }

    if (!botReplies) { // TODO or nothing matched, so a default response is returned
      if (message.text) {
        botReplies = await bot.process(message.text);
      }
    }

    if (botReplies) {
      botReplies
        .filter((msg) => msg.type === 'text')
        .forEach((msg) => {
          let qr = new TextMessage(msg.text);
          if (Array.isArray(msg.quickReplies)) {
            for (const quickReply of msg.quickReplies) {
              qr = qr.addQuickReply(quickReply.text, quickReply.postbackId);
            }
          }
          fbReplies.push(qr);
        });

      botReplies
        .filter((msg) => msg.type === 'image')
        .forEach((msg) => {
          fbReplies.push(new ImageMessage(msg.url));
        });

      const genericReply = botReplies
        .filter((msg) => msg.type === 'card')
        .reduce((genericMessage, msg) => {
          return genericMessage
            .addBubble(msg.name, msg.description.substr(0, 80))
            .addUrl(msg.url)
            .addImage(msg.img)
            .addButton(msg.button, msg.url)
            .addButton('Talk to a human', 'ONBOARDING_HUMAN');
        }, new GenericMessage()); // TODO send them as a single botResponse

      if (genericReply.bubbles.length) {
        fbReplies.push(genericReply);
      }

      if (fbReplies.length === 0) {
        const fallbackTextMsg = new TextMessage("For special requests please type 'Talk to a human'");
        await reply.messages(fallbackTextMsg);
        return;
      }

      await reply.messages(...fbReplies);
      return;
    }

    // if (message.attachments) {
    //
    // }

    const fallbackTextMsg = new TextMessage("Ops, I'm lost...");
    await reply.messages(fallbackTextMsg);
  }

}

export default MessageReceiver;
