import crypto from 'crypto';

function verify(secret) {
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

export default {
  verify,
};
