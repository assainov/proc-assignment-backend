export class ClientError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.status = 'failure';
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.status = 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.status = 'not_found';
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.status = 'unauthorized';
  }
}