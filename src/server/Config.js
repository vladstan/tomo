class Config {

  static _instance: Config;

  port: string;
  mongoUrl: string;
  userAgent: string;

  facebookAccessToken: string;
  facebookVerifyToken: string;
  facebookAppSecret: string;
  facebookApiUrl: string;

  witAiAccessToken: string;
  witAiApiUrl: string;
  witAiApiVersion: string;

  forecastIoApiKey: string;
  googleMapsApiKey: string;

  expediaApiKey: string;
  expediaApiUrl: string;

  static getInstance(): Config {
    if (!this._instance) {
      const env = process.env.NODE_ENV || 'development';
      this._instance = new Config(env);
    }

    return this._instance;
  }

  constructor(env: string) {
    this.loadDefault();
    this.loadEnv(env);
    this.validate();
  }

  loadEnv(env: string) {
    if (env === 'production') {
      this.loadProduction();
    } else if (env === 'test') {
      this.loadTest();
    } else {
      this.loadDevelopment();
    }
  }

  loadDefault() {
    this.port = process.env.PORT || '3000';
    this.mongoUrl = process.env.MONGO_URL;
    this.userAgent = 'OkClaire';

    this.facebookAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    this.facebookVerifyToken = process.env.FACEBOOK_VERIFY_TOKEN;
    this.facebookAppSecret = process.env.FACEBOOK_APP_SECRET;
    this.facebookApiUrl = 'https://graph.facebook.com/v2.8';

    this.witAiAccessToken = process.env.WITAI_ACCESS_TOKEN;
    this.witAiApiUrl = 'https://api.wit.ai';
    this.witAiApiVersion = '20160516';

    this.forecastIoApiKey = process.env.FORECASTIO_API_KEY;
    this.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

    this.expediaApiKey = 'Mx9MyJwcDUwUyMSlXrQoQNVCH4aaYjG1';
    this.expediaApiUrl = 'http://terminal2.expedia.com/x/activities/search';
  }

  loadProduction() {}

  loadDevelopment() {}

  loadTest() {}

  validate() {
    for (const [key, value] of Object.entries(this)) {
      if (!value && typeof value !== 'boolean') {
        throw new Error(`config variable ${key} is ${value}`);
      }
    }
  }

}

export default Config;
