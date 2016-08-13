import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from './config';

mongoose.Promise = bluebird;

mongoose.connect(config.mongoUrl, {
  db: {native_parser: true},
  server: {poolSize: 5},
});

mongoose.connection.on('open', () => {
  log('successfully connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  throw err;
});
