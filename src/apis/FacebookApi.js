import got from 'got';

import Config from 'server/Config';

class FacebookApi {

  static getInstance(config: Config): FacebookApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config: Config): FacebookApi {
    this.config = config;
  }

  async postMessage(body: Object): Object {
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

    // TODO https://github.com/sindresorhus/got
    log.silly('FacebookApi', 'API request:', 'GET', url, JSON.stringify(options));
    try {
      const resp = await got(url, options);
      return resp.body;
    } catch (err) {
      log.error('FacebookApi', 'request error', err.response.body);
      throw err;
    }
  }

}

export default FacebookApi;
