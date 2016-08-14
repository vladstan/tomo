import winston, {Logger} from 'winston';

const logger = new Logger({
  transports: [
    new winston.transports.Console({
      level: 'silly',
      prettyPrint: true,
      colorize: true,
      silent: process.env.NODE_ENV === 'test',
      timestamp: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      stderrLevels: ['error'],
    }),
  ],
});

export default logger;
