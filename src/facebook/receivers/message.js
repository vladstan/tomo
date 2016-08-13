import {TextMessage} from '../messages';

export default async function(event, reply, bot) {
  const message = event.message;
  await reply.actions('mark_seen', 'typing_on');

  if (message.text) {
    let replies = await bot.process(message.text);
    replies = replies.map((msg) => new TextMessage(msg.text));
    await reply.messages(...replies);
    return;
  }

  // if (message.attachments) {
  //
  // }

  const fallbackTextMsg = new TextMessage("Ops, I'm lost...");
  await reply.messages(fallbackTextMsg);
}
