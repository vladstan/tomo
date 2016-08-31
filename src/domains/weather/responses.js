export function WEATHER_FORECAST({location, forecast}) {
  const currently = forecast.currently;
  const summary = currently.summary.toLowerCase();
  return `The weather in ${location.name} is ${summary} and ${currently.temperature}ºC`;
}

export function CANNOT_FIND_LOCATION({location}) {
  return `I don't know where ${location.name} is`;
  // [
  //   `Sorry, I can't find that location`,
  //   `I don't know where ${location.name} is`
  // ]
}

export function CANNOT_FIND_FORECAST({location}) {
  return `Sorry, I don't know what the weather is in ${location.name}`;
  // [
  //   `Sorry, I don't know what the weather is in ${location.name}`,
  //   [`Oops, my satellites can't see that far`, `I can't find the weather for ${location.name}`]
  // ]
}

export function WHERE_LOCATION() {
  return 'Where?';
}
