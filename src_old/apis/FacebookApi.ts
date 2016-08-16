import got from 'got';

class FacebookApi {

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config) {
    this.config = config;
  }

  async postMessage(body) {
    const url = this.config.facebookApiUrl + '/me/messages';
    const options = {
      method: 'POST',
      query: {
        access_token: this.config.facebookAccessToken,
      },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': this.config.userAgent,
      },
      body: JSON.stringify(body),
      json: true,
    };

    const resp = await got(url, options);
    return resp.body;
  }

}

export default FacebookApi;
