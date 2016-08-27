declare class ForecastIo$ForecastIo {
  constructor(apiKey: string): this;
}

declare module 'forecast-io' {
  declare module.exports: Class<ForecastIo$ForecastIo>
}
