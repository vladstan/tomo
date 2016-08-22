class PostcardsActions {

  constructor(PostcardsActions) {
    this.postcardsApi = postcardsApi;
  }

  async getPostcards(intent: string) {
    // const result = await this.googleMapsApi.geocodeLocation(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    // if (result) {
    //   return {
    //     lat: result.geometry.location.lat,
    //     long: result.geometry.location.lng,
    //     name: result.formatted_address,
    //   };
    // }

    return this.postcardsApi.getResults(intent);
  }

}

export default PostcardsActions;
