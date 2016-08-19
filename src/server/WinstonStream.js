import {Writable} from 'stream';

class WinstonStream extends Writable {

  constructor(level) {
    super({
      decodeStrings: false,
    });

    this._logger = log; // global
    this._level = level;
  }

  _write(chunk, encoding, callback) {
    const str = (typeof chunk === 'string') ? chunk : chunk.toString(encoding);
    this._logger.log(this._level, str.trim());
    callback();
  }

}

export default WinstonStream;
