import RecommendActions from 'domains/activities/RecommendActions';

import RecommendApi from 'domains/activities/RecommendApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class RecommendStory {

  recommendActions: RecommendActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const recommendApi = RecommendApi.getInstance(config);
    this.recommendActions = new RecommendActions(recommendApi);

    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Find me a restaurant')
      .intent('recommend', 'recommend')
      .entity('property_type', 'property_type', 'restaurant');

    user.says('Find a coffeeshop nearby')
      .intent('recommend', 'recommend')
      .entity('property_type', 'property_type', 'coffee');

    user.says('Find a club')
      .intent('recommend', 'recommend')
      .entity('property_type', 'property_type', 'club');
      // .entity('activity_type', 'activity_type', 'biking');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running Recommend Story with new context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (entities.property_type[0]) {
      context.property_type = entities.property_type[0].value;
    }

    log.debug('intent and property', context.intent, context.property_type);

    if (context.intent === 'recommend' && context.property_type === 'restaurant') {
      let location = 'Palma de Mallorca';
      const listings = await this.recommendActions.getRecommendations(context.property_type);
      bot.sayText(`Here is a list with probably the best restaurants on ${location}`);
      bot.sendCards(listings);
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'recommend' && context.property_type === 'coffee') {
      let location = 'Palma de Mallorca';
      const listings = await this.recommendActions.getRecommendations(context.property_type);
      bot.sayText(`Here is a list of places where you can find the best coffee on ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'recommend' && context.property_type === 'club') {
      let location = 'Palma de Mallorca';
      const listings = await this.recommendActions.getRecommendations(context.property_type);
      bot.sayText(`Here is a list with probably best clubs in ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'recommend' && context.property_type === 'shuttle') {
      let location = 'Palma de Mallorca';
      const listings = await this.recommendActions.getRecommendations(context.property_type);
      bot.sayText(`Here is a list with probably the best airport shuttles in ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'recommend' && context.property_type === 'activity') {
      let location = 'Palma de Mallorca';
      const listings = await this.recommendActions.getRecommendations(context.property_type);
      bot.sayText(`Here is a list with probably the best activities you can do in ${location}`);
      bot.sendCards(listings);
      // We can add here the buttons and the actions.
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
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

export default RecommendStory;
