import got from 'got';

const API_URL = 'https://api.wit.ai';
const API_VERSION = '20160516';
const USER_AGENT = 'OkClaire';

class WitAiApi {

  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  getMessage(message, msgId, threadId) {
    if (typeof message !== 'string' || message.length < 1 || message.length > 255) {
      throw new Error('message length must be between 0 and 256');
    }

    const url = API_URL + '/message';
    const options = {
      method: 'GET',
      query: {
        v: API_VERSION,
        q: message,
        msg_id: msgId,
        thread_id: threadId,
      },
      headers: {
        'User-Agent': USER_AGENT,
        'Authorization': 'Bearer ' + this.accessToken,
      },
      json: true,
    };

    return got(url, options).then((resp) => resp.body);
  }

}

export default WitAiApi;
