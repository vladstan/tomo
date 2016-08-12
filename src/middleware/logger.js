import chalk from 'chalk';

const STATUS_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green'
};

export default function(winston) {
  return async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;

    let logLevel;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else if (ctx.status >= 100) {
      logLevel = 'info';
    }

    const msg = (chalk.gray(`${ctx.method} ${ctx.originalUrl}`) +
      chalk[STATUS_COLORS[logLevel]](` ${ctx.status} `) +
      chalk.gray(`${ms}ms`));

    winston.log(logLevel, msg);
  };
}
