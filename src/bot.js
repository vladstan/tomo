import botBuilder from 'claudia-bot-builder';
import {Wit} from 'node-wit';

import * as actions from './actions';

const wit = new Wit({
  accessToken: 'GZYELIAI26IAKUPUMG3W3626BG5EX32E',
  actions
});

export default botBuilder((request) => {
  const sessionId = request.sender;
  const context0 = {};
  return wit.runActions(sessionId, request.text, context0, 10)
    .then((context2) => {
      console.log('The session state is now: ' + JSON.stringify(context2));
      return 'aha';
    })
    .catch((err) => {
      console.error('beep boop', err.stack);
      return 'Beep boop error.';
    });
});
