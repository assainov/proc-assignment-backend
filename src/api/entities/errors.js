/**
 * Represents a client error due to incorrectly supplied inputs.
 * 
 * @class ClientError
 * @extends {Error}
 * 
 * @param {string} message - The error message.
 * 
 * @property {number} statusCode - The HTTP status code for the error, default is 400.
 * @property {string} status - The status of the error, default is 'failure' (of an operation).
 * 
 */
export class ClientError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.status = 'failure';
  }
}

/**
 * Represents an unknown server error.
 * Good for using in defensive programming where the error isn't really expected,
 * or expected due to 3rd party services.
 * 
 * @class ServerError
 * @extends {Error}
 * 
 * @param {string} message - The error message.
 * 
 * @property {number} statusCode - The HTTP status code for the error, default is 500.
 * @property {string} status - The status of the error, default is 'error'.
 * 
 * @description
 * This error should be used to indicate a server-side error that occurs during the execution of the application.
 * It captures the stack trace at the point where the error was instantiated.
 */
export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.status = 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Class representing a NotFoundError.
 * @extends Error
 * 
 * @description
 * Whenever a resource is not found in the system, this error should be thrown.
 */
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.status = 'not_found';
  }
}

/**
 * Represents an Unauthorized Error.
 * This error is thrown when a user attempts to access a resource
 * they do not have permission to access.
 *
 * @class UnauthorizedError
 * @extends {Error}
 * @param {string} message - The error message.
 * @property {number} statusCode - The HTTP status code for the error (401).
 * @property {string} status - The status of the error ('unauthorized').
 */
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.status = 'unauthorized';
  }
}