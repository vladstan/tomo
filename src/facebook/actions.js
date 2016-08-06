// import * as utils from './utils';
import {Image, Text} from './builder';

let reply = null;

class Actions {

  constructor(replyInstance) {
    reply = replyInstance;
  }

  async send({sessionId}, {text, quickreplies}) {
    console.info('action:send', ...arguments);
    let msg = new Text(text);
    if (quickreplies) {
      console.log('should handle quickreplies', quickreplies);
    }
    await reply.messages(msg);
  }

  async getForecast({context, entities}) {
    console.info('action:getForecast', ...arguments);
    // const location = firstEntityValue(request.entities, 'location');
    // if (location) {
    //   context.forecast = 'sunny in ' + location; // we should call a weather API here
    //   delete context.missingLocation;
    // } else {
    //   context.missingLocation = true;
    //   delete context.forecast;
    // }
    context.forecast = 'sunny';
    return context;
  }

  async showApartment({context, entities}) {
    console.info('action:showApartment', ...arguments);
    const msg = new Image('http://cretahomes.com/wp-content/uploads/2014/01/Beautiful-Apartment-Ideas-Design.jpg');
    await reply.messages(msg);
  }

}

export default Actions;
