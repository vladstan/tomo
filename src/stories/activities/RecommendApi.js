const DATA = {};

import Config from 'server/Config';

class RecommendApi {

  static _instance: RecommendApi;

  client: RecommendApi;
  config: Config;

  static getInstance(config): RecommendApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  async getRecommendations(type) {
    return DATA[type];
  }

}

DATA.restaurant = [{
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

DATA.club = [{
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

DATA.coffee = [{
  'id': 'coffee1',
  'name': 'Bon Vent Cafe&Bar',
  'description': 'Balearic style terrace-bar in the Palma beach. We offer traditional and fresh food, cocktails, music and really good vibes.',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/07/aa/22/e8/bon-vent-cafe-bar.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d7216589-Reviews-Bon_Vent_Cafe_Bar-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971490966',
}, {
  'id': 'coffee2',
  'name': 'Ca\'n Joan De S\'aigo',
  'description': 'Address: Calle Can Sanc 10 | 07001, 07001 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/02/64/f9/08/desde-1700.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d2259430-Reviews-Ca_n_Joan_De_S_aigo-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971710759',
}, {
  'id': 'coffee3',
  'name': 'BIANCO Cafe & Bakery',
  'description': 'Address: Paseo Mallorca 32, 07012 Palma de Mallorca, Majorca, Spain',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/07/ef/14/bc/el-placer-de-desayunar.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d8048967-Reviews-BIANCO_Cafe_Bakery-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34658085985',
}, {
  'id': 'coffee4',
  'name': 'Cappuccino Paseo Maritimo',
  'description': '1 Palma de Mallorca, 07014 Palma de Mallorca, Majorca, Spains',
  'img': 'https://media-cdn.tripadvisor.com/media/photo-s/03/2e/c5/9b/cappuccino-paseo-maritimo.jpg',
  'url': 'https://www.tripadvisor.com/Restaurant_Review-g187463-d2328811-Reviews-Cappuccino_Paseo_Maritimo-Palma_de_Mallorca_Majorca_Balearic_Islands.html',
  'button': 'See Details',
  'phone': '+34971282162',
}];

DATA.activity = [{
  'id': 'activity1',
  'name': 'Hop-On Hop-Off Bus Tour',
  'description': 'This hop-on hop-off bus tour manages to cover serious ground—all while allotting you the flexibility to explore at a pace and schedule best suited for you.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/afefc205185d99c75e2b0318fc77243a1662aa29.jpeg',
  'url': 'https://www.expedia.com/things-to-do/hop-on-hop-off-bus-tour.a172079.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity2',
  'name': 'Mallorca Island Full-Day Tour',
  'description': 'Enjoy a day exploring the island of Mallorca. Although small, the island is diverse and has many areas of natural beauty.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/3746c15e49491de842df84fbac1234add75047f5.jpeg',
  'url': 'https://www.expedia.com/things-to-do/mallorca-island-full-day-tour.a214411.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity3',
  'name': 'Walking Tour & Tapas Dinner with a Local',
  'description': 'With a passionate local guide at your side, admire grand buildings and medieval city walls before sitting around a table to share a meal with your new companions.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/2c9e7c1ce73748f43123a3d41733785911dd08ab.jpeg',
  'url': 'https://www.expedia.com/things-to-do/walking-tour-tapas-dinner-with-a-local.a262289.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity4',
  'name': 'Tapas & Paella Cooking Workshop in Santa Catalina',
  'description': ' Learn how to produce classic dishes such as paella and great-tasting sweet and savory tapas, and then sit down to feast on the meal with your new companions.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/9d9d381c5e581c22a78dcbf704fd1495337dde38.jpeg',
  'url': 'https://www.expedia.com/things-to-do/tapas-paella-cooking-workshop-in-santa-catalina.a263621.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity5',
  'name': 'Sea Caving Adventure',
  'description': 'A day filled with fun, adventure, and a mix of stunning landscapes awaits you. ',
  'img': 'https://a.travel-assets.com/mediavault.le/media/ef2503356b8d3af3e2b0de2cb3ef25c899bce091.jpeg',
  'url': 'https://www.expedia.com/things-to-do/sea-caving-adventure.a255286.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity6',
  'name': 'Best Isolated Beaches of the Island Tour',
  'description': 'Leave the tourist beaches and crowds behind and head for the quiet idyllic spots that only the locals are privy to.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/6aaa7d606459861e42dd986307cc19463f20796a.jpeg',
  'url': 'https://www.expedia.com/things-to-do/best-isolated-beaches-of-the-island-tour.a262297.activity-details',
  'button': 'Book Now',
}, {
  'id': 'activity7',
  'name': 'Boat Tour & Snorkeling in Palma Bay',
  'description': 'Discover the natural beauty of the Palma Bay marine reserve as you snorkel through its abundant fauna and flora.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/a0566900f8dd1b8442aca4df59f404a214ff244f.jpeg',
  'url': 'https://www.expedia.com/things-to-do/boat-tour-snorkeling-in-palma-bay.a255290.activity-details',
  'button': 'Book Now',
}];

DATA.shuttle = [{
  'id': 'shuttle1',
  'name': '$7/person - Shared Shuttle: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/0db3877fc4c02834e27e09f4c9578875cf830769.jpeg',
  'url': 'https://www.expedia.com/things-to-do/shared-shuttle-mallorca-airport-pmi.a215950.activity-details',
  'button': 'Book Now',
}, {
  'id': 'shuttle2',
  'name': '$17/person - Speedy Shuttle: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/aa612480ce5cb839f41daab762bd670886a4b8f8.jpeg',
  'url': 'https://www.expedia.com/things-to-do/speedy-shuttle-mallorca-airport-pmi.a223006.activity-details',
  'button': 'Book Now',
}, {
  'id': 'shuttle3',
  'name': '$37/person - Private Minivan: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/a97f5bfd0196d115f3ce0b7d0d1e3be43f7e4e9a.jpeg',
  'url': 'https://www.expedia.com/things-to-do/private-minivan-mallorca-airport-pmi.a215790.activity-details',
  'button': 'Book Now',
}, {
  'id': 'shuttle4',
  'name': '$67/person - Private Minibus: Mallorca Airport (PMI)',
  'description': 'Price per person. Max People 8, Bags 16,  Free cancellation,  No booking or credit card fees',
  'img': 'https://a.travel-assets.com/mediavault.le/media/408fc525e4638a7610c82af024d2eeb47d5da8d5.jpeg',
  'url': 'https://www.expedia.com/things-to-do/private-minibus-mallorca-airport-pmi.a215870.activity-details?',
  'button': 'Book Now',
}];

DATA.boat = [{
  'id': 'boat1',
  'name': '2195 €/ week - OCEANIS 45 (2012)',
  'description': '10 persons - 4 cabins - Berths 8+2 - Size: 45ft',
  'img': 'https://cdn1.theglobesailor.com/doc/boat/model/544/photo/oceanis-45-1599_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-6724,762.html',
  'button': 'Request now',
}, {
  'id': 'boat2',
  'name': '1595 € / week - BAVARIA 40 CRUISER (2010)',
  'description': '8 people - Cabins 3- Size - 39ft',
  'img': 'https://cdn1.theglobesailor.com/doc/charter/boat/2140/photo/bavaria-40-cruiser-3782_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-2140,762.html',
  'button': 'Request now',
}, {
  'id': 'boat3',
  'name': '3300€ / week LAGOON 380 (2013)',
  'description': '12 people - Cabins 4 - Size - 38ft',
  'img': 'https://cdn1.theglobesailor.com/doc/charter/boat/9135/photo/lagoon-380-25512_max.jpg',
  'url': 'http://www.theglobesailor.com/rent-boat/boat-9135,762.html',
  'button': 'Request now',
}];

export default RecommendApi;
