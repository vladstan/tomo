class WeatherActions {

  constructor(forecastIoApi) {
    this.forecastIoApi = forecastIoApi;
  }

  async getLocation(location) {
    return {
      lat: 48.2000,
      long: 16.3667,
      name: location,
    };
  }

  async getForecast(options) {
    const forecastString = await this.forecastIoApi.getWeather(options);
    return JSON.parse(forecastString);
  }

}

export default WeatherActions;
