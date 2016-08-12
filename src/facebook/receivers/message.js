export default async function(event, reply, wit, db) {
  const senderId = event.sender.id;
  const message = event.message;
  const sessionId = senderId;

  await reply.actions('mark_seen', 'typing_on');

  const session = await db.findOrInsert(sessionId, {
    sessionId: sessionId,
    context: {}
  });

  if (message.text) {
    await wit.runActions(sessionId, message.text, session.context, 10);
  }

  // if (message.attachments) {
  //
  // }
}
