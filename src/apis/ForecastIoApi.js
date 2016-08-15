import ForecastIO from 'forecast-io';

class ForecastIoApi {

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config) {
    this.client = new ForecastIO(config.forecastIoApiKey);
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

export default ForecastIoApi;
