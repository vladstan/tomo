import {TextMessage} from '../messages';

export default async function(event, reply, wit, db) {
  const message = event.message;

  await reply.actions('mark_seen', 'typing_on');

  if (message.text) {
    await reply.messages(new TextMessage(message.text));
  }

  // if (message.attachments) {
  //
  // }
}
