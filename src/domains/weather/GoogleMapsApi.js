import GoogleMapsAPI from 'googlemaps';
import {promisify} from 'bluebird';

class GoogleMapsApi {

  static getInstance(config) {
    if (!this._instance) {
      this._instance = new this(config);
    }

    return this._instance;
  }

  constructor(config) {
    this.api = new GoogleMapsAPI({
      key: config.googleMapsApiKey,
      secure: true,
    });
  }

  async geocodeLocation(locationName) {
    const params = {
      'address': locationName,
      'language': 'en',
      // 'region': 'uk'
    };

    const geocode = promisify(::this.api.geocode);
    const response = await geocode(params);
    // console.log('response', response);

    if (response.results && response.results[0]) {
      return response.results[0];
    }

    return null;
  }

}

export default GoogleMapsApi;
