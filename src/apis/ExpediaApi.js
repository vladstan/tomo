
import Config from 'server/Config';

class ExpediaApi {

  static _instance: ExpediaApi;

  client: ExpediaApi;
  config: Config;

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config: Config) {
    const key: string = config.expediaApiKey;
    this.client = new ExpediaApi(key);
  }

  async getActivities({location, category}) {
    return await this.client
      .location(location)
      .category(category)
      // .exclude('minutely,daily')
      // .extendHourly(true)
      .get();
  }

}

export default ExpediaApi;
