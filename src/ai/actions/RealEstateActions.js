class RealEstateActions {

  constructor(realEstateApi, logger) {
    this.realEstateApi = realEstateApi;
  }

  async getResults(intent) {
    // const result = await this.googleMapsApi.geocodeLocation(locationName);
    // this.logger.silly('getLocation geocoding result', JSON.stringify(result));

    // if (result) {
    //   return {
    //     lat: result.geometry.location.lat,
    //     long: result.geometry.location.lng,
    //     name: result.formatted_address,
    //   };
    // }

    return this.realEstateApi.getResults(intent);
  }

}

export default RealEstateActions;
