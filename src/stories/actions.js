import {firstEntityValue} from '../utils';
import {Generic, Image, Text} from './builder';

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
      realEstate: ::this.realEstate,
      sendRealEstateSuggestions: ::this.sendRealEstateSuggestions
    };
  }

  async send({sessionId}, {text, quickreplies}) {
    console.info('action:send', ...arguments);
    let msg = new Text(text);
    if (Array.isArray(quickreplies)) {
      for (let quickReply of quickreplies) {
        msg = msg.addQuickReply(quickReply, quickReply);
      }
    }
    await this.reply.messages(msg);
  }

  async realEstate({sessionId, context, entities}) {
    console.info('action:realEstate', ...arguments, JSON.stringify(entities));
    const entityNames = [
      're_intent',
      're_property',
      'location',
      're_num_rooms',
      're_room_type',
      're_budget',
      're_furniture'
    ];

    for (let entityName of entityNames) {
      const entityValue = firstEntityValue(entities, entityName);
      if (entityValue) {
        context[entityName] = entityValue;
        // delete context['missing_' + entityName];
      } else {
        // context['missing_' + entityName] = true;
        // delete context[entityName];
      }
    }

    const re_num_rooms = firstEntityValue(entities, 're_num_rooms'); // 5
    const re_room_type = firstEntityValue(entities, 're_room_type'); // bathroom, bedroom
    if (re_room_type) {
      context['re_num_rooms_' + re_room_type] = re_num_rooms || 0;
    }

    await this.storeContext(sessionId, context);
    return context;
  }

  async sendRealEstateSuggestions({sessionId}) {
    console.info('action:sendRealEstateSuggestions', ...arguments);
    const msg = new Generic()
      .addBubble('Photos from NASA\'s rovers on Mars', 'Curiosity Rover icon by Oliviu Stoian from the Noun Project')
        .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/rovers.png')
        .addButton('Curiosity', 'CURIOSITY_IMAGES')
        .addButton('Opportunity', 'OPPORTUNITY_IMAGES')
        .addButton('Spirit', 'SPIRIT_IMAGES')
      .addBubble('International Space Station', 'Space station icon by Lucid Formation from the Noun Project')
        .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/iss.png')
        .addButton('Current position', 'ISS_POSITION')
        .addButton('Website', 'https://www.nasa.gov/mission_pages/station/')
      .addBubble('How many people are in Space right now?', 'Astronaut icon by Javier Cabezas from the Noun Project')
        .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/astronaut.png')
        .addButton('Show', 'PEOPLE_IN_SPACE')
        .addButton('Website', 'http://www.howmanypeopleareinspacerightnow.com')
      .addBubble('Help & info', 'Monster icon by Paulo Sá Ferreira from the Noun Project')
        .addImage('https://raw.githubusercontent.com/stojanovic/space-explorer-bot/master/assets/images/about.png')
        .addButton('About the bot', 'ABOUT')
        .addButton('Credits', 'CREDITS')
        .addButton('Report an issue', 'https://github.com/stojanovic/space-explorer-bot/issues');
    await this.reply.messages(msg);
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
