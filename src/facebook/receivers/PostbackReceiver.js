import TextMessage from 'facebook/messages/TextMessage';
import GenericMessage from 'facebook/messages/GenericMessage';

class PostbackReceiver {

  async receive(event, reply, bot) {
    const postback = event.postback;
    // event.postback.payload
    await reply.actions('mark_seen', 'typing_on');

    const fbReplies = [];

    if (postback.payload) {
      const botReplies = await bot.postback(postback.payload);

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
            .addButton('I <3 this', 'DEV_LOVE_THIS')
            .addButton('Call an Agent', 'DEV_CALL_AGENT');
        }, new GenericMessage()); // TODO send them as a single botResponse

      if (genericReply.bubbles.length) {
        fbReplies.push(genericReply);
      }

      await reply.messages(...fbReplies);
      return;
    }

    const fallbackTextMsg = new TextMessage("Ops, I'm lost...");
    await reply.messages(fallbackTextMsg);
  }

}

export default PostbackReceiver;

// TODO
// export default async function(req, event, reply) {
  // var senderID = event.sender.id;
  // var recipientID = event.recipient.id;
  // var timeOfPostback = event.timestamp;
  //
  // // The 'payload' param is a developer-defined field which is set in a postback
  // // button for Structured Messages.
  // var payload = event.postback.payload;
  //
  // console.log("Received postback for user %d and page %d with payload '%s' " +
  //   "at %d", senderID, recipientID, payload, timeOfPostback);
  //
  // // When a postback is called, we'll send a message back to the sender to
  // // let them know it was successful
  // sendTextMessage(senderID, "Postback called");
// }
