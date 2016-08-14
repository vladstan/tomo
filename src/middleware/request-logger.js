import morgan from 'morgan';
import {promisify} from 'bluebird';
import winstonStream from 'winston-stream';
import winston from '../utils/logger';

export default function() {
  return async(ctx, next) => {
    const logStream = winstonStream(winston, 'debug');

    const format = '[:date[clf]] :method :url :status';
    const logger = promisify(morgan(format, {stream: logStream}));

    await logger(ctx.req, ctx.res);
    await next();
  };
}
