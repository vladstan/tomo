import WeatherActions from 'ai/actions/WeatherActions';

import ForecastIoApi from 'apis/ForecastIoApi';
import GoogleMapsApi from 'apis/GoogleMapsApi';

import Config from 'server/Config';
import StoryUser from 'ai/StoryUser';

import BotPast from 'ai/bot/BotPast';
import BotInterface from 'ai/bot/BotInterface';

class WeatherStory {

  weatherActions: WeatherActions;
  user: StoryUser;

  constructor(config: Config, user: StoryUser) {
    const forecastIoApi = ForecastIoApi.getInstance(config);
    const googleMapsApi = GoogleMapsApi.getInstance(config);
    this.weatherActions = new WeatherActions(forecastIoApi, googleMapsApi);

    this.define(user);
    this.user = user;
  }

  define(user: StoryUser) {
    user.says("What's the weather?")
      .intent('get_weather');

    user.says("What's the weather in Paris?")
      .intent('get_weather')
      .entity('wit/location', 'location', 'Paris');

    user.says('In Paris')
      .entity('wit/location', 'location', 'Paris');

    // TODO specify date (e.g. now (default), tomorrow, this week)
  }

  async run(past: BotPast, context: Object, entities: Object, bot: BotInterface) {
    log.debug('running WeatherStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    // log.silly(context.intent, '===', 'get_weather');
    if (context.intent === 'get_weather') {
      return await this.doGetWeather(context, entities, bot);
    }

    // log.silly(
    //   "entities.location[0] && past.botAsked('get_weather')",
    //   entities.location[0], '&&', past.botAsked('get_weather'),
    //   entities.location[0] && past.botAsked('get_weather'),
    // );
    if (entities.location[0] && past.botAsked('get_weather')) {
      return await this.doGetWeather(context, entities, bot);
    }
  }

  async postback() {}

  async doGetWeather(context: Object, entities: Object, bot: BotInterface) {
    if (entities.location[0]) {
      context.location = entities.location[0].value;
    }

    if (context.location) {
      const location = await this.weatherActions.getLocation(context.location);
      if (!location) {
        bot.say('CANNOT_FIND_LOCATION', {location: {name: context.location}});
        return true;
      }

      bot.memory.remember('location', location, '30m');

      const forecast = await this.weatherActions.getForecast(location);
      if (!forecast) {
        bot.say('CANNOT_FIND_FORECAST', {location: {name: context.location}});
        return;
      }

      return await this.doForecast(location, forecast, bot);
    }

    const location = bot.memory.get('location');
    if (location) {
      const forecast = await this.weatherActions.getForecast(location);
      if (forecast) {
        return await this.doForecast(location, forecast, bot);
      }
    }

    bot.ask('get_weather', 'WHERE_LOCATION');
    return true;
  }

  async doForecast(location: Object, forecast: Object, bot: BotInterface) {
    log.silly('doForecast');
    bot.memory.remember('forecast', forecast, '5m');
    bot.say('WEATHER_FORECAST', {location, forecast});
    return true;
  }

}

export default WeatherStory;
