import {firstEntityValue} from '../utils';
import {Image, Text} from './builder';

class Actions {

  constructor(reply, db) {
    this.reply = reply;
    this.db = db;
  }

  storeContext(sessionId, context) {
    return this.db.update(sessionId, {context});
  }

  getActions() {
    return {
      send: ::this.send,
      getForecast: ::this.getForecast,
      showApartment: ::this.showApartment,
      findProperty: ::this.findProperty
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

  async getForecast({sessionId, context, entities}) {
    console.info('action:getForecast', ...arguments);
    const location = firstEntityValue(entities, 'location');

    if (location) {
      context.forecast = 'sunny in ' + location;
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }

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
