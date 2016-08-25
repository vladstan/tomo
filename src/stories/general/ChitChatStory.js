import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class ChitChatStory {

  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Hello - Hi - Hey')
      .intent('greeting', 'greeting');
    user.says('I am drunnk')
      .intent('drunk', 'drunk');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running Chit Chat Story with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (context.intent === 'greeting') {
      bot.sayText('Hello there. How can I help?'); // TODO make this random.
      return true;
    }

    if (context.intent === 'siri') {
      bot.sayText('Haha, this is very funny. Hmm, I mean not so funny :|'); // TODO make this random.
      return true;
    }

    if (context.intent === 'real') {
      bot.sayText('Sorry but not sure if you\'re ready to hear my answer. Let\'s not talk about this now.'); // TODO make this random.
      return true;
    }

    if (context.intent === 'drunk') {
      bot.sayText('OMG. Hope your friends are with you. Make sure you\'re not driving.'); // TODO make this random.
      return true;
    }

    if (context.intent === 'tell_joke') {
      bot.sayText('There is a band called 1023GB. They haven\'t had any gigs yet.'); // TODO make this random.
      bot.sayText('Funny?'); // TODO make this random.
      return true;
    }

    if (context.intent === 'approval') {
      bot.sayText('Thank you'); // TODO make this random.
      return true;
    }

    if (context.intent === 'goodbye') {
      bot.sayText('Good bye for now!'); // TODO make this random.
      return true;
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {} // TODO remove empty calls (super)

}

export default ChitChatStory;
