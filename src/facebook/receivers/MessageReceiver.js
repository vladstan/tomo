import TextMessage from 'facebook/messages/TextMessage';
import GenericMessage from 'facebook/messages/GenericMessage';

class MessageReceiver {

  async receive(event, reply, bot) {
    const message = event.message;
    await reply.actions('mark_seen', 'typing_on');

    const fbReplies = [];

    if (message.text) {
      const botReplies = await bot.process(message.text);

      botReplies
        .filter((msg) => msg.type === 'text')
        .forEach((msg) => fbReplies.push(new TextMessage(msg.text)));

      const genericReply = botReplies
        .filter((msg) => msg.type === 'card')
        .reduce((genericMessage, msg) => {
          genericMessage.addBubble(msg.name, msg.description);
          genericMessage.addUrl(msg.url);
          genericMessage.addImage(msg.img);
          genericMessage.addButton('I <3 this');
          genericMessage.addButton('Call an Agent');
          return genericMessage;
        }, new GenericMessage()); // TODO send them as a single botResponse

      fbReplies.push(genericReply);

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
