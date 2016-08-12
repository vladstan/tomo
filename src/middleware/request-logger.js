import {promisify} from 'bluebird';
import morgan from 'morgan';

export default function() {
  return async(ctx, next) => {
    const logger = promisify(morgan('common'));
    await logger(ctx.req, ctx.res);
    await next();
  };
}
