import got from 'got';

const API_URL = 'https://graph.facebook.com/v2.6';
const USER_AGENT = 'OkClaire';

class FacebookApi {

  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  postMessage(body) {
    const url = API_URL + '/me/messages';
    const options = {
      method: 'POST',
      query: {
        access_token: this.accessToken
      },
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT
      },
      body: JSON.stringify(body),
      json: true
    };

    return got(url, options).then((resp) => resp.body);
  }

}

export default FacebookApi;
