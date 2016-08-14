import winstonStream from 'winston-stream';
import {promisify} from 'bluebird';

import raw from 'raw-body';
import morgan from 'morgan';
import crypto from 'crypto';

class Middleware {

  bodyParser(options = {}) {
    return async function(ctx, next) {
      const encoding = ctx.req.headers['content-encoding'] || 'identity';
      let contentLength = ctx.req.headers['content-length'];
      if (contentLength && encoding === 'identity') {
        options.length = contentLength = ~~contentLength;
      }
      options.encoding = options.encoding || 'utf8';
      options.limit = options.limit || '1mb';

      try {
        const rawString = await raw(ctx.req, options);
        try {
          ctx.request.rawBody = rawString;
          if (rawString) {
            ctx.request.body = JSON.parse(rawString);
          }
        } catch (err) {
          err.status = 400;
          err.body = rawString;
          throw err;
        }
      } catch (err) {
        throw err;
      }

      await next();
    };
  }

  requestLogger(logger) {
    return async(ctx, next) => {
      const logStream = winstonStream(logger, 'debug');
      const reqLogger = promisify(morgan('dev', {stream: logStream}));

      await reqLogger(ctx.req, ctx.res);
      await next();
    };
  }

  xHubSignature(secret) {
    return async function(ctx, next) {
      const signature = ctx.req.headers['x-hub-signature'];
      if (!signature) {
        ctx.throw(400, 'x-hub-signature is empty');
      }

      const hmac = crypto.createHmac('sha1', secret);
      hmac.update(ctx.request.rawBody, 'utf-8');

      const expected = 'sha1=' + hmac.digest('hex');
      if (signature !== expected) {
        ctx.throw(403, 'x-hub-signature cannot be verified');
      }

      await next();
    };
  }

}

export default Middleware;
