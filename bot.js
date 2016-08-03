const botBuilder = require('claudia-bot-builder');
const excuse = require('huh');
const wit = require('node-wit');
const Wit = wit.Wit;

const client = new Wit({accessToken: '5YR7SD27AAQNFKR2W63ZETSENKB4T4CT'});

module.exports = botBuilder(function(request) {
  return client.converse(request.sender, request.text, {})
    .then((data) => {
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
      return JSON.stringify(data);
    });
});
