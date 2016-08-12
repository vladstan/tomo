import winston from 'winston';

const logger = winston;

global.log = {
  error: logger.error,
  warn: logger.warn,
  info: logger.info
};

export default logger;
