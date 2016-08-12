import winston from 'winston';

global.log = winston.info;
global.logWarn = winston.warn;
global.logError = winston.error;

export default winston;
