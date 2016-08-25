import BoatsApi from 'apis/BoatsApi';

class BoatsActions {

  boatsApi: BoatsApi;

  constructor(boatsApi: BoatsApi) {
    this.boatsApi = boatsApi;
  }

  async getBoats() {
    // const result = await this.googleMapsApi.geocodeLocation(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    // if (result) {
    //   return {
    //     lat: result.geometry.location.lat,
    //     long: result.geometry.location.lng,
    //     name: result.formatted_address,
    //   };
    // }

    return this.boatsApi.getBoats();
  }

}

export default BoatsActions;
