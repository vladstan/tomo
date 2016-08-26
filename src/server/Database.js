import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;

class Database {

  constructor(config) {
    this.config = config;
  }

  connect() {
    mongoose.connect(this.config.mongoUrl, {
      db: {native_parser: true},
      server: {poolSize: 5},
    });

    mongoose.connection.on('open', () => {
       log.info('successfully connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      throw err;
    });
  }

}

export default Database;
