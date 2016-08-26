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
      .entity('booking_type', 'flight', 'flight')
      .entity('property_type', 'wine_bar', 'wine_bar');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running Missing Features Story with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (context.intent === 'book') {
      bot.sayText("I don't know how to book flights, hotels or restaurants right now, but you can talk with a coleague.")
        .quickReply('Talk to a human', 'ONBOARDING_HUMAN');
      return true;
    }

    if (context.intent === 'recommend' && context.property_type === 'wine_bar') {
      bot.sayText('Wine bar recommendation is still a special request. Please talk with a coleague about it.')
        .quickReply('Talk to a colleague', 'ONBOARDING_HUMAN');
    }

    if (context.intent === 'recommend' && context.property_type === 'beach') {
      bot.sayText('I\'m still learning about the best beaches. Please talk with a coleague about this.')
        .quickReply('Talk to a colleague', 'ONBOARDING_HUMAN');
    }
  }

  async postback(past: BotPast, context: Object, postbackId: string, bot: BotInterface) {} // TODO remove empty calls (super)

}

export default MissingFeaturesStory;
