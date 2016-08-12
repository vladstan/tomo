import Koa from 'koa';
import jsonBody from 'koa-json-body';

import winstonLogger from './utils/logger';
import requestLogger from './middleware/logger';
import mongodb from './middleware/mongodb';

import config from './config';
import router from './router';

const app = new Koa();

app.use(requestLogger(winstonLogger));
app.use(jsonBody({limit: '10kb'}));
app.use(mongodb(config.mongoUrl, {native_parser: true}));
app.use(router.routes());

app.listen(config.port, () => {
  console.log('Listening on port %s', config.port);
});
