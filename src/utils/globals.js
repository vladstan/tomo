import winston from 'winston';

global.log = winston.info;
global.log.warn = winston.warn;
global.log.error = winston.error;

export default winston;
