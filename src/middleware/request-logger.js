import {promisify} from 'bluebird';
import morgan from 'morgan';

import winston from 'winston';
import winstonStream from 'winston-stream';

export default function() {
  return async(ctx, next) => {
    const logStream = winstonStream(winston, 'info');

    const format = '[:date[clf]] :method :url :status';
    const logger = promisify(morgan(format, {stream: logStream}));

    await logger(ctx.req, ctx.res);
    await next();
  };
}
