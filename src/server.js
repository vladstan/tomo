import './utils/logger';
import Koa from 'koa';

import requestLogger from './middleware/request-logger';
import bodyParser from './middleware/body-parser';
import mongodb from './middleware/mongodb';

import config from './config';
import router from './router';

const app = new Koa();

app.use(requestLogger());
app.use(bodyParser({limit: '1mb'}));
app.use(mongodb(config.mongoUrl, {native_parser: true}));
app.use(router.routes());

app.listen(config.port, () => {
  log('listening on port %s', config.port);
});
