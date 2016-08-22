const DATA = {};

import Config from 'server/Config';

class RestaurantsApi {

  static _instance: RestaurantsApi;

  client: RestaurantsApi;
  config: Config;

  static getInstance(config): RestaurantsApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  async getRestaurants() {
    return DATA.restaurants;
  }

  async getClubs() {
    return DATA.clubs;
  }

  async getCoffee() {
    return DATA.coffeeshop;
  }
}

DATA.restaurants = [{
  'id': 'activity1',
  'name': 'Nikki Beach Mallorca',
  'description': '$$$$ International, European, Japanese, Mediterranean, Sushi',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/0b/95/36/ec/nikki-beach-mallorca.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d2660050-Reviews-Nikki_Beach_Mallorca-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971123962',
}, {
  'id': 'activity2',
  'name': 'Quadrat Restaurant',
  'description': '$$$$ International, Mediterranean, Spanish, Contemporary, European, Gluten Free Options',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/08/43/63/a2/quadrat-restaurant.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d8054975-Reviews-Quadrat_Restaurant-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'Book Now',
  'phone': '+34971787230',
}, {
  'id': 'activity3',
  'name': 'La Despensa del Baron',
  'description': '$$$$ Mediterranean, European, Spanish, Asian',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/06/03/80/dd/la-posada.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d6700283-Reviews-La_Despensa_del_Baron-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'Book Now',
  'phone': '+34971214742',
}, {
  'id': 'activity4',
  'name': 'Cafe Ca\'n Toni',
  'description': 'REAL MAJORCAN CUISINE Café Ca\'n Toni includes one of the best gastronomic offerings of mallorcan style of Palma de Mallorca.',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/02/2d/ee/8e/wines-and-suckling-pig.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d1794342-Reviews-Cafe_Ca_n_Toni-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34871716661',
}];

DATA.clubs = [{
  'id': 'shuttle1',
  'name': 'Tito\'s',
  'description': 'This heart pounding, booty shaking disco is Palma\'s most popular dance club.',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/02/33/ad/9c/entrada.jpg',
  'url': 'https://www.tripadvisor.com/Attraction_Review-g187463-d197690-Reviews-Tito_s-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
}, {
  'id': 'shuttle2',
  'name': 'Pacha Mallorca',
  'description': 'Address: Paseo Maritimo, 42 | Palma, Illes Balears, 07014 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/04/19/f3/7f/pacha-amazing.jpg',
  'url': 'https://www.tripadvisor.com/Attraction_Review-g187463-d4419849-Reviews-Pacha_Mallorca-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
}, {
  'id': 'shuttle3',
  'name': 'Purobeach',
  'description': 'Address: Calle Pagell 1, 07610 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/01/9d/49/2e/puro-beach.jpg',
  'url': 'https://www.tripadvisor.com/Attraction_Review-g187463-d1807267-Reviews-Purobeach-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
}];

DATA.coffeeshop = [{
  'id': 'shuttle1',
  'name': 'Bon Vent Cafe&Bar',
  'description': 'Balearic style terrace-bar in the Palma beach. We offer traditional and fresh food, cocktails, music and really good vibes.',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/07/aa/22/e8/bon-vent-cafe-bar.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d7216589-Reviews-Bon_Vent_Cafe_Bar-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971490966',
}, {
  'id': 'shuttle2',
  'name': 'Ca\'n Joan De S\'aigo',
  'description': 'Address: Calle Can Sanc 10 | 07001, 07001 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/02/64/f9/08/desde-1700.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d2259430-Reviews-Ca_n_Joan_De_S_aigo-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971710759',
}, {
  'id': 'shuttle3',
  'name': 'BIANCO Cafe & Bakery',
  'description': 'Address: Paseo Mallorca 32, 07012 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/07/ef/14/bc/el-placer-de-desayunar.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d8048967-Reviews-BIANCO_Cafe_Bakery-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34658085985',
}, {
  'id': 'shuttle4',
  'name': 'Cappuccino Paseo Maritimo',
  'description': '1 Palma de Mallorca, 07014 Palma de Mallorca, Majorca, Spains',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/03/2e/c5/9b/cappuccino-paseo-maritimo.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d2328811-Reviews-Cappuccino_Paseo_Maritimo-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971282162'
}];

export default RestaurantsApi;
