const DATA = {};

class PostcardsApi {

  static _instance: PstcardsApi;

  static getInstance(config): PostcardsApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  getResults(intent: string) {
    return DATA[intent];
  }

}

DATA.postacards = [{
  'id': 'postcard1',
  'name': 'Palma de Mallorca - CATHEDRAL',
  'description': ' $2.99 -  Real Postcard - Free shipping, worldwide ',
  'img': 'https://www.mypostcard.com/design-shop/photos/palma-de-mallorca-cathedral-cities-architecture-send-greeting-card-online-5235_19.jpg',
  'url': 'https://www.mypostcard.com/en/design-shop/holiday-greetings/palma-de-mallorca-cathedral-cities-architecture-send-greeting-card-online-5235',
  'buton': 'Order now',
}, {
  'id': 'postcard2',
  'name': 'Sunny greetings from Palma de Mallorca',
  'description': '$2.99 -  Real Postcard - Free shipping, worldwide',
  'img': 'https://www.mypostcard.com/design-shop/thumbs/sunny-greetings-from-palma-travel-vacation-send-postcard-online-1990_99.jpg',
  'url': 'https://www.mypostcard.com/en/design-shop/holiday-greetings/sunny-greetings-from-palma-travel-vacation-send-postcard-online-1990',
  'buton': 'Order now',
}, {
  'id': 'postcard3',
  'name': 'I love Mallorca',
  'description': '$2.99 -  Real Postcard - Free shipping, worldwide',
  'img': 'https://www.mypostcard.com/design-shop/photos/i-love-mallorca-travel-vacation-send-greeting-card-online-1727_62.jpg',
  'url': 'https://www.mypostcard.com/en/design-shop/holiday-greetings/i-love-mallorca-travel-vacation-send-greeting-card-online-1727',
  'buton': 'Order now',
}];

export default PostcardsApi;
