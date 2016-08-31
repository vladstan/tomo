import ForecastIo from 'forecast-io';

import Config from 'server/Config';

class ForecastIoApi {

  static _instance: ForecastIoApi;

  client: ForecastIo;
  config: Config;

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config: Config) {
    const key: string = config.forecastIoApiKey;
    this.client = new ForecastIo(key);
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
