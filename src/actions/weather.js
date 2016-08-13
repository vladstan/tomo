import config from '../config';
import {ForecastIoApi} from '../apis';

const forecastIoApi = new ForecastIoApi(config.forecastIoApiKey);

export async function getLocation(location) {
  return {
    lat: 48.2000,
    long: 16.3667,
    name: location,
  };
}

export async function getForecast(options) {
  const forecast = await forecastIoApi.getWeather(options);
  return forecast;
}
