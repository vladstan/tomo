export default async function(req, event, reply, wit) {
  const senderId = event.sender.id;
  const message = event.message;

  const messageText = message.text;
  // const messageAttachments = message.attachments;

  const sessionId = senderId;
  const context0 = {};

  await reply.actions('mark_seen', 'typing_on');
  if (messageText) {
    await wit.runActions(sessionId, messageText, context0, 10);
  }
  await reply.actions('typing_off');
}
