const DATA = {};

import Config from 'server/Config';

class ExpediaApi {

  static _instance: ExpediaApi;

  client: ExpediaApi;
  config: Config;

  static getInstance(config): ExpediaApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  async getActivities({intent}) {
    return DATA.activities;
  }

  async getShuttle({intent}) {
    return DATA.shuttle;
  }

}

DATA.activities = [{
  'id': 'activity1',
  'name': 'Hop-On Hop-Off Bus Tour',
  'description': 'This hop-on hop-off bus tour manages to cover serious ground—all while allotting you the flexibility to explore at a pace and schedule best suited for you.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/afefc205185d99c75e2b0318fc77243a1662aa29.jpeg',
  'url': 'https://www.expedia.com/things-to-do/hop-on-hop-off-bus-tour.a172079.activity-details',
}, {
  'id': 'activity2',
  'name': 'Mallorca Island Full-Day Tour',
  'description': 'Enjoy a day exploring the island of Mallorca. Although small, the island is diverse and has many areas of natural beauty.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/3746c15e49491de842df84fbac1234add75047f5.jpeg',
  'url': 'https://www.expedia.com/things-to-do/mallorca-island-full-day-tour.a214411.activity-details',
}, {
  'id': 'activity3',
  'name': 'Walking Tour & Tapas Dinner with a Local',
  'description': 'With a passionate local guide at your side, admire grand buildings and medieval city walls before sitting around a table to share a meal with your new companions.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/2c9e7c1ce73748f43123a3d41733785911dd08ab.jpeg',
  'url': 'https://www.expedia.com/things-to-do/walking-tour-tapas-dinner-with-a-local.a262289.activity-details',
}, {
  'id': 'activity4',
  'name': 'Tapas & Paella Cooking Workshop in Santa Catalina',
  'description': ' Learn how to produce classic dishes such as paella and great-tasting sweet and savory tapas, and then sit down to feast on the meal with your new companions.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/9d9d381c5e581c22a78dcbf704fd1495337dde38.jpeg',
  'url': 'https://www.expedia.com/things-to-do/tapas-paella-cooking-workshop-in-santa-catalina.a263621.activity-details',
}, {
  'id': 'activity5',
  'name': 'Sea Caving Adventure',
  'description': 'A day filled with fun, adventure, and a mix of stunning landscapes awaits you. ',
  'img': 'https://a.travel-assets.com/mediavault.le/media/ef2503356b8d3af3e2b0de2cb3ef25c899bce091.jpeg',
  'url': 'https://www.expedia.com/things-to-do/sea-caving-adventure.a255286.activity-details',
}, {
  'id': 'activity6',
  'name': 'Best Isolated Beaches of the Island Tour',
  'description': 'Leave the tourist beaches and crowds behind and head for the quiet idyllic spots that only the locals are privy to.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/6aaa7d606459861e42dd986307cc19463f20796a.jpeg',
  'url': 'https://www.expedia.com/things-to-do/best-isolated-beaches-of-the-island-tour.a262297.activity-details',
}, {
  'id': 'activity7',
  'name': 'Boat Tour & Snorkeling in Palma Bay',
  'description': 'Discover the natural beauty of the Palma Bay marine reserve as you snorkel through its abundant fauna and flora.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/a0566900f8dd1b8442aca4df59f404a214ff244f.jpeg',
  'url': 'https://www.expedia.com/things-to-do/boat-tour-snorkeling-in-palma-bay.a255290.activity-details',
}];

DATA.shuttle = [{
  'id': 'shuttle1',
  'name': '$7: Shared Shuttle: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/0db3877fc4c02834e27e09f4c9578875cf830769.jpeg',
  'url': 'https://www.expedia.com/things-to-do/shared-shuttle-mallorca-airport-pmi.a215950.activity-details',
}, {
  'id': 'shuttle2',
  'name': '$17: Speedy Shuttle: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/aa612480ce5cb839f41daab762bd670886a4b8f8.jpeg',
  'url': 'https://www.expedia.com/things-to-do/speedy-shuttle-mallorca-airport-pmi.a223006.activity-details',
}, {
  'id': 'shuttle3',
  'name': '$37 Private Minivan: Mallorca Airport (PMI)',
  'description': 'To schedule pick-up and return times, please follow the instructions on your voucher after checkout.',
  'img': 'https://a.travel-assets.com/mediavault.le/media/2c9e7c1ce73748f43123a3d41733785911dd08ab.jpeg',
  'url': 'https://www.expedia.com/things-to-do/private-minivan-mallorca-airport-pmi.a215790.activity-details',
}, {
  'id': 'shuttle4',
  'name': '$67 Private Minibus: Mallorca Airport (PMI)',
  'description': 'Price per person. Max People 8, Bags 16,  Free cancellation,  No booking or credit card fees',
  'img': 'https://a.travel-assets.com/mediavault.le/media/408fc525e4638a7610c82af024d2eeb47d5da8d5.jpeg',
  'url': 'https://www.expedia.com/things-to-do/private-minibus-mallorca-airport-pmi.a215870.activity-details?',
}];

export default ExpediaApi;
