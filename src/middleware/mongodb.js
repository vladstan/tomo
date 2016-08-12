import {promisify} from 'bluebird';

import {MongoClient} from 'mongodb';
import {Pool} from 'generic-pool';

export default function(url, options = {}) {
  const pool = new Pool({
    create: (cb) => MongoClient.connect(url, options, cb),
    destroy: (db) => db.close()
  });

  return async function(ctx, next) {
    ctx.db = await promisify(::pool.acquire)();
    try {
      await next();
    } catch (err) {
      throw err;
    } finally {
      pool.release(ctx.db);
      delete ctx.db;
    }
  };
}
