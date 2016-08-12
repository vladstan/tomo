import Koa from 'koa';
import Logger from 'koa-bunyan-log';
import jsonBody from 'koa-json-body';

import mongodb from './middleware/mongodb';

import config from './config';
import router from './router';

const app = new Koa();
const logger = new Logger();

app.use(logger.attach());
app.use(logger.attachRequest());
app.use(jsonBody({limit: '10kb'}));
app.use(mongodb(config.mongoUrl, {native_parser: true}));
app.use(router.routes());

app.listen(config.port, () => {
  console.log('Listening on port %s', config.port);
});
