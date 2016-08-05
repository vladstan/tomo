// import * as utils from './utils';

class Actions {

  constructor() {
    this.reply = async function() {};
  }

  setReplyHandler(handler) {
    this.reply = handler;
  }

  async send({sessionId}, {text, quickreplies}) {
    console.info('action:send', ...arguments);
    await this.reply(...arguments);
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

}

export default Actions;
