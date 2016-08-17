import RealEstateActions from 'ai/actions/RealEstateActions';

class RealEstateStory {

  constructor(config, user, logger) {
    this.logger = logger;
    this.realEstateActions = new RealEstateActions(logger);
    this.define(user);
    this.user = user;
  }

  // TODO run auto correct on text before sending to wit.ai
  define(user) {
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

  async run(past, context, entities, bot) {
    this.logger.debug('running RealEstateStory with context', JSON.stringify(context));

    if (entities.intent[0]) {
      context.intent = entities.intent[0].value;
    }

    if (['rent', 'buy'].includes(context.intent)) {
      if (entities.property_type[0]) {
        context.property_type = entities.property_type[0].value;
      }

      if (context.property_type) {
        await bot.say('ACKNOWLEDGE_USER_INTENT', {
          intent: context.intent,
          property_type: context.property_type,
        });
        return true;
      }

      await bot.say('ACKNOWLEDGE_USER_INTENT', {intent: context.intent});
      return true;
    }

    //
    // // this.logger.silly(context.intent, '===', 'get_weather');
    //
    // // this.logger.silly(
    // //   "entities.location[0] && past.botAsked('get_weather')",
    // //   entities.location[0], '&&', past.botAsked('get_weather'),
    // //   entities.location[0] && past.botAsked('get_weather'),
    // // );
    // if (entities.location[0] && past.botAsked('get_weather')) {
    //   return await this.doGetWeather(context, entities, bot);
    // }
  }

  // async doGetWeather(context, entities, bot) {
    // if (entities.location[0]) {
    //   context.location = entities.location[0].value;
    // }
    //
    // if (context.location) {
    //   const location = await this.realEstateActions.getLocation(context.location);
    //   if (!location) {
    //     await bot.say('CANNOT_FIND_LOCATION', {location});
    //     return true;
    //   }
    //
    //   bot.memory.remember('location', location, '30m');
    //
    //   const forecast = await this.realEstateActions.getForecast(location);
    //   if (!forecast) {
    //     await bot.say('CANNOT_FIND_FORECAST', {location});
    //     return;
    //   }
    //
    //   return await this.doForecast(location, forecast, bot);
    // }
  //
  //   const location = bot.memory.get('location');
  //   if (location) {
  //     const forecast = await this.realEstateActions.getForecast(location);
  //     if (forecast) {
  //       return await this.doForecast(location, forecast, bot);
  //     }
  //   }
  //
  //   await bot.ask('get_weather', 'WHERE_LOCATION');
  //   return true;
  // }
  //
  // async doForecast(location, forecast, bot) {
  //   this.logger.silly('doForecast');
  //   bot.memory.remember('forecast', forecast, '5m');
  //   await bot.say('WEATHER_FORECAST', {location, forecast});
  //   return true;
  // }

}

export default RealEstateStory;
