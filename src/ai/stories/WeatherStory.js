import WeatherActions from 'ai/actions/WeatherActions';
import ForecastIoApi from 'apis/ForecastIoApi';

class WeatherStory {

  constructor(config, user, logger) {
    this.logger = logger;

    const forecastIoApi = ForecastIoApi.getInstance(config);
    this.weatherActions = new WeatherActions(forecastIoApi);

    this.define(user);
    this.user = user;
  }

  define(user) {
    user.says("What's the weather?")
      .intent('get_weather');

    user.says("What's the weather in Paris?")
      .intent('get_weather')
      .entity('location', 'location', 'Paris');

    user.says('In Paris')
      .entity('location', 'location', 'Paris');
  }

  async run(past, context, entities, bot) {
    this.logger.debug('running WeatherStory with context=' + context); // TODO stringify

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    // this.logger.silly(context.intent, '===', 'get_weather');
    if (context.intent === 'get_weather') {
      return await this.doGetWeather(context, entities, bot);
    }

    // this.logger.silly(
    //   "entities.location[0] && past.botAsked('get_weather')",
    //   entities.location[0], '&&', past.botAsked('get_weather'),
    //   entities.location[0] && past.botAsked('get_weather'),
    // );
    if (entities.location[0] && past.botAsked('get_weather')) {
      return await this.doGetWeather(context, entities, bot);
    }
  }

  async doGetWeather(context, entities, bot) {
    if (entities.location[0]) {
      context.location = entities.location[0].value;
    }

    if (context.location) {
      const location = await this.weatherActions.getLocation(context.location);
      if (!location) {
        await bot.say('CANNOT_FIND_LOCATION', {location});
        return true;
      }

      bot.memory.remember('location', location, '30m');

      const forecast = await this.weatherActions.getForecast(location);
      if (!forecast) {
        await bot.say('CANNOT_FIND_FORECAST', {location});
        return;
      }

      return await this.doForecast(forecast, bot);
    }

    const forecastText = bot.memory.get('forecast_text');
    if (forecastText) {
      await bot.sayText(forecastText); // TODO remove sayText, use say
      return true;
    }

    const location = bot.memory.get('location');
    if (location) {
      const forecast = await this.weatherActions.getForecast(location);
      if (forecast) {
        return await this.doForecast(forecast, bot);
      }
    }

    await bot.ask('get_weather', 'WHERE_LOCATION');
    return true;
  }

  async doForecast(forecast, bot) {
    this.logger.silly('doForecast', 'forecast.currently=' + forecast.currently); // TODO stringify

    const currently = forecast.currently;
    const summary = currently.summary.toLowerCase();
    const forecastText = `The weather is ${summary} and ${currently.temperature}ºC`;

    bot.memory.remember('forecast', forecast, '5m');
    bot.memory.remember('forecast_text', forecastText, '5m');

    await bot.sayText(forecastText);
    return true;
  }

}

export default WeatherStory;
