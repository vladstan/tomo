import RealEstateActions from 'ai/actions/RealEstateActions';
import RealEstateApi from 'apis/RealEstateApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class RealEstateStory {

  realEstateActions: RealEstateActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const realEstateApi = RealEstateApi.getInstance(config);
    this.realEstateActions = new RealEstateActions(realEstateApi);

    this.define(user);
    this.user = user;
  }

  // TODO run auto correct on text before sending to wit.ai
  define(user: StoryUser) {
    user.says('I want to rent')
      .intent('rent', 'rent');
    user.says('I want to rent an apartment')
      .intent('rent', 'rent')
      .entity('property_type', 'property_type', 'apartment');

    // TODO support synonyms
    // TODO define boy.says, too, to calculate confidence and do story matching like wit.ai does

    user.says('I want to buy')
      .intent('buy', 'buy');
    user.says('I want to buy an apartment')
      .intent('buy', 'buy')
      .entity('property_type', 'property_type', 'apartment');

    user.says('An apartment') // TODO multi-generate (templates)
      .entity('property_type', 'property_type', 'apartment');
    user.says('A villa')
      .entity('property_type', 'property_type', 'villa');
    user.says('A town house')
      .entity('property_type', 'property_type', 'town house');

    user.says('4 bedrooms')
      .entity('wit/number', 're_num_rooms', '4')
      .entity('re_room_type', 're_room_type', '4');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running RealEstateStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (['rent', 'buy'].includes(context.intent)) {
      if (entities.property_type[0]) {
        context.property_type = entities.property_type[0].value;
      }

      if (context.property_type) {
        const listings = await this.realEstateActions.getResults(context.intent);
        bot.say('ACKNOWLEDGE_USER_INTENT', {
          intent: context.intent,
          property_type: context.property_type,
        });
        bot.sendCards(listings); // TODO map every field explicitly
        // const imageProps = {};
        // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
        // bot.sendImage(imageProps);
        return true;
      }

      bot.say('ACKNOWLEDGE_USER_INTENT', {intent: context.intent});
      // bot.scheduleMessage('5m', 'Try next thing?', true);
      // bot.scheduleMessage('2d', (bot) => {
      //   bot.sayText('Try next thing?');
      //   bot.sendImage({url: 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg'});
      // }, false, '1h');

      return true;
    }

    //
    // // log.silly(context.intent, '===', 'get_weather');
    //
    // // log.silly(
    // //   "entities.location[0] && past.botAsked('get_weather')",
    // //   entities.location[0], '&&', past.botAsked('get_weather'),
    // //   entities.location[0] && past.botAsked('get_weather'),
    // // );
    // if (entities.location[0] && past.botAsked('get_weather')) {
    //   return await this.doGetWeather(context, entities, bot);
    // }
  }

}

export default RealEstateStory;
