import mongoose from 'mongoose';
import bluebird from 'bluebird';

import logger from '../utils/logger';
import config from '../config';

mongoose.Promise = bluebird;

mongoose.connect(config.mongoUrl, {
  db: {native_parser: true},
  server: {poolSize: 5},
});

mongoose.connection.on('open', () => {
  logger.info('successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  throw err;
});
