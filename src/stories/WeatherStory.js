import Story from './Story';
import {getLocation, getForecast} from '../actions/weather';

class WeatherStory extends Story {

  constructor(user) {
    super(user);

    user.says(`What's the weather?`)
      .intent('get_weather');

    user.says(`What's the weather in Paris?`)
      .intent('get_weather')
      .entity('wit/location', 'location', 'Paris');

    user.says(`In Paris`)
      .entity('wit/location', 'location', 'Paris');
  }

  async run(past, context, entities, bot) {
    if (context.intent === 'get_weather') {
      return await this.doGetWeather(context, entities, bot);
    }

    if (entities.location[0] && past.botAsked('get_weather')) {
      return await this.doGetWeather(context, entities, bot);
    }
  }

  async doGetWeather(context, entities, bot) {
    if (entities.location[0]) {
      context.location = entities;
    }

    if (context.location) {
      const location = await getLocation(entities.location[0]);
      if (!location) {
        await bot.say('CANNOT_FIND_LOCATION', {location});
        return true;
      }

      bot.memory.remember('location', location, '30m');

      const forecast = await getForecast(location);
      if (!forecast) {
        await bot.say('CANNOT_FIND_FORECAST', {location});
        return;
      }

      return await this.doForecast(forecast, bot);
    }

    const forecastText = bot.memory.get('forecast_text');
    if (forecastText) {
      await bot.sayText(forecastText);
      return true;
    }

    const location = bot.memory.get('location');
    if (location) {
      const forecast = await getForecast(location);
      if (forecast) {
        return await this.doForecast(forecast, bot);
      }
    }

    await bot.ask('get_weather', 'WHERE_LOCATION');
    return true;
  }

  async doForecast(forecast, bot) {
    const currently = forecast.currently;
    const forecastText = `The weather is ${currently.icon} and ${currently.temperature}`;

    bot.memory.remember('forecast', forecast, '5m');
    bot.memory.remember('forecast_text', forecastText, '5m');

    await bot.sayText(forecastText);
    return true;
  }

}

export default WeatherStory;
