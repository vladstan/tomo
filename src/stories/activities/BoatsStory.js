import BoatsActions from 'stories/activities/BoatsActions';
import BoatsApi from 'stories/activities/BoatsApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class BoatsStory {

  boatsActions: BoatsActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const boatsApi = BoatsApi.getInstance(config);
    this.boatsActions = new BoatsActions(boatsApi);

    this.define(user);
    this.user = user;
  }

  // TODO run auto correct on text before sending to wit.ai
  define(user: StoryUser) {
    user.says('Rent a boat')
    .intent('rent', 'rent')
    .entity('property_type', 'property_type', 'boat');

    // TODO support synonyms
    // TODO define boy.says, too, to calculate confidence and do story matching like wit.ai does
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running PostcardsStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (['rent', 'buy'].includes(context.intent)) {
      if (entities.property_type[0]) {
        context.property_type = entities.property_type[0].value;
      }

      if (context.property_type === 'boat') {
        const listings = await this.boatsActions.getBoats();
        bot.sayText('Here is a list of boats you can rent in Palma de Mallorca');
        bot.sendCards(listings); // TODO map every field explicitly
        // const imageProps = {};
        // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
        // bot.sendImage(imageProps);
        return true;
      }

      // bot.say('ACKNOWLEDGE_USER_INTENT', {intent: context.intent});
      // // bot.scheduleMessage('5m', 'Try next thing?', true);
      // // bot.scheduleMessage('2d', (bot) => {
      // //   bot.sayText('Try next thing?');
      // //   bot.sendImage({url: 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg'});
      // // }, false, '1h');
      //
      // return true;
    }
  }

}

export default BoatsStory;
