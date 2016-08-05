// import * as utils from './utils';

export async function send({sessionId}, {text, quickreplies}) {
  console.info('action:send', ...arguments);
  // sendQueue.push(response.text);
}

export async function getForecast({context, entities}) {
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
