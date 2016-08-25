import RestaurantsActions from 'stories/activities/RestaurantsActions';

import RestaurantsApi from 'stories/activities/RestaurantsApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class RestaurantsStory {

  restaurantsActions: RestaurantsActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const restaurantsApi = RestaurantsApi.getInstance(config);
    this.restaurantsActions = new RestaurantsActions(restaurantsApi);

    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Find a restaurant')
      .intent('get_restaurant');

    user.says('Find a coffeeshop nearby')
      .intent('get_coffeeshop');

    user.says('Find a club')
      .intent('get_club', 'club');
      // .entity('activity_type', 'activity_type', 'biking');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running RestaurantsStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (context.intent === 'get_restaurant') {
      let location = 'Palma de Mallorca';
      const listings = await this.restaurantsActions.getRestaurants();
      bot.sayText(`Here is a list with probably the best restaurants on ${location}`);
      bot.sendCards(listings);
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'get_coffeeshop') {
      let location = 'Palma de Mallorca';
      const listings = await this.restaurantsActions.getCoffee();
      bot.sayText(`Here is a list of places where you can find the best coffee on ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'get_clubs') {
      let location = 'Palma de Mallorca';
      const listings = await this.restaurantsActions.getClubs();
      bot.sayText(`Here is a list with probably best clubs in ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
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

export default RestaurantsStory;
