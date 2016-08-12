import raw from 'raw-body';

export default function(options = {}) {
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
      log(err.limit, err.length, err.expected, err.received, err.encoding);
      throw err;
    }

    await next();
  };
}
