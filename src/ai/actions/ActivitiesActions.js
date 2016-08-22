class ActivitiesActions {

  constructor(expediaAPI) {
    this.expediaAPI = expediaAPI;
  }

  async getActivities(intent: string) {
    // const result = await this.googleMapsApi.geocodeLocation(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    // if (result) {
    //   return {
    //     lat: result.geometry.location.lat,
    //     long: result.geometry.location.lng,
    //     name: result.formatted_address,
    //   };
    // }

    return this.ExpediaApi.getActivities(intent);
  }

}

export default ActivitiesActions;
