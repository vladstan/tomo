import {firstEntityValue} from '../utils';
import {Image, Text} from './builder';

class Actions {

  constructor(reply, db, openWeather) {
    this.reply = reply;
    this.db = db;
    this.openWeather = openWeather;
  }

  storeContext(sessionId, context) {
    return this.db.update(sessionId, {context});
  }

  getActions() {
    return {
      send: ::this.send,
      getForecast: ::this.getForecast,
      showApartment: ::this.showApartment,
      findProperty: ::this.findProperty,
      realEstate: ::this.realEstate
    };
  }

  async send({sessionId}, {text, quickreplies}) {
    console.info('action:send', ...arguments);
    let msg = new Text(text);
    if (quickreplies) {
      console.log('should handle quickreplies', quickreplies);
    }
    await this.reply.messages(msg);
  }

  async realEstate({sessionId, context, entities}) {
    console.info('action:realEstate', ...arguments);
    const re_intent = firstEntityValue(entities, 're_intent'); // eslint-disable-line camelcase
    const re_property = firstEntityValue(entities, 're_property'); // eslint-disable-line camelcase
    const re_location = firstEntityValue(entities, 're_location'); // eslint-disable-line camelcase
    const re_bedrooms = firstEntityValue(entities, 're_bedrooms'); // eslint-disable-line camelcase
    const re_bathrooms = firstEntityValue(entities, 're_bathrooms'); // eslint-disable-line camelcase
    const re_budget = firstEntityValue(entities, 're_budget'); // eslint-disable-line camelcase
    const re_furniture = firstEntityValue(entities, 're_furniture'); // eslint-disable-line camelcase

    if (re_intent) { // eslint-disable-line camelcase
      context.re_intent = re_intent; // eslint-disable-line camelcase
      delete context.missing_re_intent;
    } else {
      context.missing_re_intent = true;
      delete context.re_intent;
    }

    if (re_property) { // eslint-disable-line camelcase
      context.re_property = re_property; // eslint-disable-line camelcase
      delete context.missing_re_property;
    } else {
      context.missing_re_property = true;
      delete context.re_property;
    }

    if (re_location) { // eslint-disable-line camelcase
      context.re_location = re_location; // eslint-disable-line camelcase
      delete context.missing_re_location;
    } else {
      context.missing_re_location = true;
      delete context.re_location;
    }

    if (re_bedrooms) { // eslint-disable-line camelcase
      context.re_bedrooms = re_bedrooms; // eslint-disable-line camelcase
      delete context.missing_re_bedrooms;
    } else {
      context.missing_re_bedrooms = true;
      delete context.re_bedrooms;
    }

    if (re_bathrooms) { // eslint-disable-line camelcase
      context.re_bathrooms = re_bathrooms; // eslint-disable-line camelcase
      delete context.missing_re_bathrooms;
    } else {
      context.missing_re_bathrooms = true;
      delete context.re_bathrooms;
    }

    if (re_furniture) { // eslint-disable-line camelcase
      context.re_furniture = re_furniture; // eslint-disable-line camelcase
      delete context.missing_re_furniture;
    } else {
      context.missing_re_furniture = true;
      delete context.re_furniture;
    }

    if (re_budget) { // eslint-disable-line camelcase
      context.re_budget = re_budget; // eslint-disable-line camelcase
      delete context.missing_re_budget;
    } else {
      context.missing_re_budget = true;
      delete context.re_budget;
    }



    await this.storeContext(sessionId, context);
    return context;
  }

  async getForecast({sessionId, context, entities}) {
    console.info('action:getForecast', ...arguments);
    const location = firstEntityValue(entities, 'location');
    const weather = firstEntityValue(entities, 'weather');

    if (location) {
      const forecast = await this.openWeather.city(location).now();
      context.forecast = forecast.weather[0].description + ' and the temperature ' + forecast.main.temp + 'ºC';
      console.info('forecast', JSON.stringify(context.forecast));
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }

    context.location = location;
    context.weather = weather;

    await this.storeContext(sessionId, context);
    return context;
  }

  async showApartment({context, entities}) {
    console.info('action:showApartment', ...arguments);
    const msg = new Image('http://cretahomes.com/wp-content/uploads/2014/01/Beautiful-Apartment-Ideas-Design.jpg');
    await this.reply.messages(msg);
  }

  async findProperty({sessionId, context, entities}) {
    console.info('action:findProperty', ...arguments);
    const property = firstEntityValue(entities, 'property');
    const intent = firstEntityValue(entities, 'intent');

    if (property) {
      context.property = property;
      delete context.missingProperty;
    } else {
      context.missingProperty = true;
      delete context.property;
    }

    if (intent) {
      context.intent = intent;
      delete context.missingIntent;
    } else {
      context.missingIntent = true;
      delete context.intent;
    }

    await this.storeContext(sessionId, context);
    return context;
  }

}

export default Actions;
