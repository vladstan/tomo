import {promisify} from 'bluebird';
import deed from 'deed';

export default function(secret) {
  return async function(ctx, next) {
    await promisify(deed)(secret, ctx.req);
    await next();
  };
}
