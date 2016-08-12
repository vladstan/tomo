import ExtendableError from 'es6-error';

class BadRequestError extends ExtendableError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export default BadRequestError;
