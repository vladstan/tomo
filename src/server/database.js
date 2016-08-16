import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

class Database {

  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
  }

  connect() {
    mongoose.connect(this.config.mongoUrl, {
      db: {native_parser: true},
      server: {poolSize: 5},
    });

    mongoose.connection.on('open', () => {
      this.logger.info('successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      throw err;
    });
  }

}

export default Database;
