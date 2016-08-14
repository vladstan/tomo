import morgan from 'morgan';
import {promisify} from 'bluebird';

import winstonStream from 'winston-stream';
import winston from '../utils/logger';

export default function() {
  return async(ctx, next) => {
    const logStream = winstonStream(winston, 'debug');
    const logger = promisify(morgan('dev', {stream: logStream}));

    await logger(ctx.req, ctx.res);
    await next();
  };
}
