import ActivitiesActions from 'ai/actions/ActivitiesActions';

import expediaAPI from 'apis/ExpediaAPI';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class ActivityStory {

  activitiesActions: ActivitiesActions;
  user: Config;

  constructor(config: Config, user: StoryUser) {
    const expediaAPI = expediaAPI.getInstance(config);
    this.activitiesActions = new ActivitiesActions(expediaAPI);

    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says('Things to do on the island')
      .intent('get_activities');

    user.says('Can you find me activities on the island?')
      .intent('get_activities')
        .entity('activity_type', 'activity_type', 'biking');
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running ActivitiesStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (context.intent === 'get_activities') {
      let location = 'Palma de Mallorca';
      const listings = await this.ActivitiesActions.getActivities(context.intent);
      bot.sayText(`Here is a list of activites you can do in ${location}`);
      bot.sendCards(listings);
      // const imageProps = {};
      // imageProps.url = 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg';
      // bot.sendImage(imageProps);
      return true;
    }

    if (context.intent === 'get_shuttle') {
      let location = 'Palma de Mallorca';
      const listings = await this.ActivitiesActions.getShuttle(context.intent);
      bot.sayText(`Here is a list of shuttles to airport from ${location}`);
      bot.sendCards(listings);
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

export default ActivityStory;
