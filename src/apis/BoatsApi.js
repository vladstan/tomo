const DATA = {};

class BoatsApi {

  static _instance: BoatsApi;

  static getInstance(config): BoatsApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  getBoats() {
    return DATA.boats;
  }

}

DATA.boats = [{
  'id': 'boat1',
  'name': '2195 €/ week - OCEANIS 45 (2012)',
  'description': '10 persons - 4 cabins - Berths 8+2 - Size: 45ft',
  'img': 'https://cdn1.theglobesailor.com/doc/boat/model/544/photo/oceanis-45-1599_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-6724,762.html',
  'button': 'Request now',
}, {
  'id': 'apartment2',
  'name': '1595 € / week - BAVARIA 40 CRUISER (2010)',
  'description': '8 people - Cabins 3- Size - 39ft',
  'img': 'https://cdn1.theglobesailor.com/doc/charter/boat/2140/photo/bavaria-40-cruiser-3782_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-2140,762.html',
  'button': 'Request now',
}, {
  'id': 'apartment3',
  'name': '3300€ / week LAGOON 380 (2013)',
  'description': '12 people - Cabins 4 - Size - 38ft',
  'img': 'https://cdn1.theglobesailor.com/doc/charter/boat/9135/photo/lagoon-380-25512_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-9135,762.html',
  'button': 'Request now',
}];

export default BoatsApi;
