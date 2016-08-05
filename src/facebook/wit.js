import {Wit} from 'node-wit';
import Actions from '../wit/actions';
import {Text} from './builder';

export default function(accessToken, reply) {
  const actions = new Actions();

  actions.setReplyHandler(async ({sessionId}, {text, quickreplies}) => {
    let msg = new Text(text);
    if (quickreplies) {
      console.log('should handle quickreplies', quickreplies);
    }
    await reply(msg);
  });

  return new Wit({
    accessToken: accessToken,
    actions: actions
  });
}
