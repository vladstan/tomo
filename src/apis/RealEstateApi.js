const DATA = {};

class RealEstateApi {

  static _instance: RealEstateApi;

  static getInstance(config): RealEstateApi {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  getResults(intent: string) {
    return DATA[intent];
  }

}

DATA.rent = [{
  'id': 'apartment1',
  'name': 'Palma de Majorca, Apartment from € 2,500 per month',
  'description': 'Apartment with spacious patio - Old town palma minimum rental period 12! ',
  'img': 'http://production.kyero.s3.amazonaws.com/3648/3648907/vwxrvxfy2d_long_term_rent_palma%20%2819%29.jpg',
  'url': 'https://www.kyero.com/en/property/3648907-apartment-long-let-palma-de-mallorca',
}, {
  'id': 'apartment2',
  'name': 'Illetes (Ses), Apartment from € 900 per month',
  'description': 'Stunning first line apartment in Illetas-This stunning apartment of approximately 68 sqm is located front line in a wonderful community ',
  'img': 'https://kyero.cloudimg.io/s/crop/400x300/http://production.kyero.s3.amazonaws.com/3669/3669521/36507528_original.jpg',
  'url': 'https://www.kyero.com/en/property/3657346-apartment-long-let-illetes-ses',
}, {
  'id': 'apartment3',
  'name': 'Palmanova, Apartment from € 1,350 per month',
  'description': '3 bedroom, 3 bathroom stunning apartment for rent in Palma Nova, The apartment has a constructed area of 210 sqm ',
  'img': 'http://production.kyero.s3.amazonaws.com/3650/3650018/36134151_original.jpg?f6ba2c798a6092fc868a0b6d0f3609de5f451f30',
  'url': 'https://www.kyero.com/en/property/3650018-apartment-long-let-palmanova',
}];

DATA.buy = [{
  'id': 'apartment1',
  'name': 'Palma de Majorca villa for sale €4,995,000',
  'description': 'Impressive modern villa with beautiful views in Son Vida. South facing. The net living area of 700 m2 is divided over two floors. ',
  'img': 'http://production.kyero.s3.amazonaws.com/3665/3665270/36419275_original.jpg?7276f5c451cc8e984a7de47189f720f47ab1622a',
  'url': 'https://www.kyero.com/en/property/3665270-villa-for-sale-palma-de-mallorca',
}, {
  'id': 'apartment2',
  'name': 'Santa Ponsa penthouse for sale €270,000',
  'description': 'Great Penthouse apartment for sale in the seafront in Santa Ponsa village. ',
  'img': 'http://production.kyero.s3.amazonaws.com/3664/3664767/36409565_original.jpg?7dc3e75777b5dd4eee81d30353917f65ce4b88e6',
  'url': 'https://www.kyero.com/en/property/3664767-apartment-for-sale-santa-ponsa',
}, {
  'id': 'apartment3',
  'name': 'Palma de Majorca apartment for sale €1,580,000',
  'description': 'In Palma de Mallorca on the fantastic location Portixol you will find the newly built luxury apartment Mallorca.',
  'img': 'http://production.kyero.s3.amazonaws.com/3661/3661729/36358586_original.jpg?276719399d6d72d31abadf4751b27b49ef7b8ea4',
  'url': 'https://www.kyero.com/en/property/3661729-apartment-for-sale-palma-de-mallorca',
}];

export default RealEstateApi;
