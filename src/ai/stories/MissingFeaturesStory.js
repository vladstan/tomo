import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class MissingFeaturesStory {

  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Book me a flight')
      .intent('book', 'book')
      .entity('booking_type', 'flight', 'flight');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (entities.booking_type[0]) {
      context.booking_type = entities.booking_type[0].value;
    }

    if (context.intent === 'book' && context.booking_type === 'flight') {
      bot.sayText("I can't do this right now")
        .quickReply('Talk to a human', 'ONBOARDING_HUMAN');
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {} // TODO remove empty calls (super)

}

export default MissingFeaturesStory;
