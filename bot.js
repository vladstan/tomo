const botBuilder = require('claudia-bot-builder');
const excuse = require('huh');

module.exports = botBuilder(function(request) {
  console.log('req test', request);
  return 'Thanks for sending ' + request.text + '. Your message is very important to us, but ' + excuse.get();
});
