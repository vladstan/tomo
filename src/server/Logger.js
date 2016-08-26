import winston from 'winston';

class Logger extends winston.Logger {

  constructor(options: Object = {}) {
    super({
      transports: [
        new winston.transports.Console({
          level: 'silly', // options.level || 'silly',
          prettyPrint: true,
          colorize: true,
          silent: false, // !!options.silent,
          timestamp: true,
          handleExceptions: false, // !!options.handleExceptions,
          humanReadableUnhandledException: false, // !!options.handleExceptions,
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
