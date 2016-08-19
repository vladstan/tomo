import winston from 'winston';

class Logger extends winston.Logger {

  constructor() {
    super({
      transports: [
        new winston.transports.Console({
          level: 'silly',
          prettyPrint: true,
          colorize: true,
          silent: false,
          timestamp: true,
          handleExceptions: process.env.NODE_ENV === 'production',
          humanReadableUnhandledException: process.env.NODE_ENV === 'production',
          stderrLevels: ['error'],
        }),
      ],
    });
  }

  attachGlobal() {
    global.log = this;
  }

}

export default Logger;
