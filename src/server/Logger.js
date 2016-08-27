import winston from 'winston';

class Logger extends winston.Logger {

  constructor(options: Object = {}) {
    super({
      transports: [
        new winston.transports.Console({
          level: options.level || 'silly',
          prettyPrint: true,
          colorize: true,
          silent: options.silent,
          timestamp: true,
          handleExceptions: options.handleExceptions,
          humanReadableUnhandledException: false,
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
