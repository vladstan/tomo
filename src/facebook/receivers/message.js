import {Text} from '../builder';

export default async function(req, event, reply) {
  const msg1 = new Text('Hello there!');
  const msg2 = new Text('Hello there again!');
  reply(msg1, msg2);
}

// const senderId = event.sender.id;
// const recipientId = event.recipient.id;
// const message = event.message;
//
// const messageText = message.text;
// const messageAttachments = message.attachments;

// export default botBuilder((request) => {
//   const sessionId = request.sender;
//   const context0 = {};
//   return wit.runActions(sessionId, request.text, context0, 10)
//     .then((context2) => {
//       console.log('The session state is now: ' + JSON.stringify(context2));
//       return 'aha';
//     })
//     .catch((err) => {
//       console.error('beep boop', err.stack);
//       return 'Beep boop error.';
//     });
// });
