declare class ForecastIO {
  static constructor(apiKey: number): ForecastIO;
}

declare module 'forecast-io' {
  declare var exports: Class<ForecastIO>;
}
