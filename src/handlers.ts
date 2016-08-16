export const main = async (ctx, next) => {
  ctx.body = 'hello!';
  await next();
};
