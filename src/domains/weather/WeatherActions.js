class WeatherActions {

  constructor(forecastIoApi, googleMapsApi) {
    this.forecastIoApi = forecastIoApi;
    this.googleMapsApi = googleMapsApi;
  }

  async getLocation(locationName) {
    const result = await this.googleMapsApi.geocodeLocation(locationName);
    // log.silly('getLocation geocoding result', JSON.stringify(result));

    if (result) {
      return {
        lat: result.geometry.location.lat,
        long: result.geometry.location.lng,
        name: result.formatted_address,
      };
    }

    return null;
  }

  async getForecast(options) {
    const forecastString = await this.forecastIoApi.getWeather(options);
    return JSON.parse(forecastString);
  }

}

export default WeatherActions;
