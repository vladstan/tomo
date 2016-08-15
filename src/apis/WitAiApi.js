import got from 'got';

class WitAiApi {

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new WitAiApi(config);
    }

    return this._instance;
  }

  constructor(config) {
    this.config = config;
  }

  async parseMessage(message, msgId, threadId) {
    if (typeof message !== 'string' || message.length < 1 || message.length > 255) {
      throw new Error('message length must be between 0 and 256');
    }

    const url = this.config.witAiApiUrl + '/message';
    const options = {
      method: 'GET',
      query: {
        v: this.config.witAiApiVersion,
        q: message,
        msg_id: msgId,
        thread_id: threadId,
      },
      headers: {
        'User-Agent': this.config.userAgent,
        'Authorization': 'Bearer ' + this.config.witAiAccessToken,
      },
      json: true,
    };

    const resp = await got(url, options);
    return resp.body;
  }

}

export default WitAiApi;
