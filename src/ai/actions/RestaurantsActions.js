import RestaurantsApi from 'apis/RestaurantsApi';

class RestaurantsActions {

  restaurantsApi: RestaurantsApi;

  constructor(restaurantsApi: RestaurantsApi) {
    this.restaurantsApi = restaurantsApi;
  }

  async getRestaurants() {
    return this.restaurantsApi.getRestaurants();
  }

  async getCoffee() {
    return this.restaurantsApi.getCoffee();
  }

  async getClubs() {
    return this.restaurantsApi.getClubs();
  }


}

export default RestaurantsActions;
