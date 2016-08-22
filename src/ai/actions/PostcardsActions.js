import PostcardsApi from 'apis/PostcardsApi';

class PostcardsActions {

  postcardsApi: PostcardsApi;

  constructor(postcardsApi: PostcardsApi) {
    this.postcardsApi = postcardsApi;
  }

  async getPostcards() {
    // const result = await this.googleMapsApi.geocodeLocation(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    // if (result) {
    //   return {
    //     lat: result.geometry.location.lat,
    //     long: result.geometry.location.lng,
    //     name: result.formatted_address,
    //   };
    // }

    return this.postcardsApi.getResults();
  }

}

export default PostcardsActions;
