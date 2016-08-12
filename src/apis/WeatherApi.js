import ForecastIO from 'forecast-io';

class WeatherApi {

  constructor(apiKey) {
    this.client = new ForecastIO(apiKey);
  }

  async getWeather({lat, long, units = 'si', lang = 'en'}) {
    return await this.client
      .latitude(lat)
      .longitude(long)
      .units(units)
      .language(lang)
      // .exclude('minutely,daily')
      // .extendHourly(true)
      .get();
  }

}

export default WeatherApi;
