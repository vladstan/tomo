import rawBody from 'raw-body';
import morgan from 'morgan';
import stream from 'stream';
import crypto from 'crypto';

class Middleware {

  bodyParser(options: Object = {}): Function {
    return async (ctx, next) => {
      const encoding = ctx.req.headers['content-encoding'] || 'identity';

      let contentLength = ctx.req.headers['content-length'];
      if (contentLength && encoding === 'identity') {
        options.length = contentLength = ~~contentLength;
      }

      options.encoding = options.encoding || 'utf8';
      options.limit = options.limit || '1mb';

      try {
        const rawString = await rawBody(ctx.req, options);
        try {
          ctx.request.rawBody = rawString;
          if (rawString) {
            ctx.request.body = JSON.parse(rawString);
          }
        } catch (err) {
          log.error('cannot parse request body as JSON', err);
          ctx.throw(400, 'cannot parse request body as JSON', {body: rawString});
        }
      } catch (err) {
        log.error('cannot parse request body', err);
        ctx.throw(400, 'cannot parse request body');
      }

      await next();
    };
  }

  requestLogger(): Function {
    return async (ctx, next) => {
      const logStream = new stream.Writable({
        decodeStrings: false,
        write: (chunk: Buffer | string, encoding, callback: Function) => {
          if (chunk instanceof Buffer) {
            chunk = chunk.toString(encoding);
          }
          log.debug(chunk.trim());
          callback();
        },
      });

      const reqLogger = morgan('dev', {stream: logStream});
      const reqLoggerAsync = Promise.promisify(reqLogger);

      await reqLoggerAsync(ctx.req, ctx.res);
      await next();
    };
  }

  xHubSignature(secret: string): Function {
    return async (ctx, next) => {
      const signature = ctx.req.headers['x-hub-signature'];
      if (!signature) {
        ctx.throw(400, 'x-hub-signature is empty');
      }

      const hmac = crypto.createHmac('sha1', secret);
      hmac.update(ctx.request.rawBody, 'utf8');

      const expected = 'sha1=' + hmac.digest('hex');
      if (signature !== expected) {
        ctx.throw(403, 'x-hub-signature cannot be verified');
      }

      await next();
    };
  }

}

export default Middleware;
