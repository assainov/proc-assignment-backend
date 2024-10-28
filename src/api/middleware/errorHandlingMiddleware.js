import {ClientError, NotFoundError, UnauthorizedError} from '../entities/errors.js';
import logger from '../utils/logger.js';

const publicMessage = 'Something went wrong. Please try again later.';

/**
 * Central error handling middleware.
 * 
 * This middleware function handles all errors that occur in the application, 
 * whether they are from asynchronous or synchronous routes. It sets a default 
 * status code of 500 for any error that does not already have a status code.
 * 
 * If the error is not an instance of `ClientError`, `NotFoundError`, or 
 * `UnauthorizedError`, it is considered a server error and is logged using 
 * the `logger.error` method.
 * 
 * The response sent to the client includes the status code and a message. 
 * If the error is a server error, a public message is sent; otherwise, the 
 * error's message is sent.
 * 
 * @param {Object} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  // All errors from async & non-async route above will be handled here
  if (error) {
    const isServerError = !(error instanceof ClientError)
      && !(error instanceof NotFoundError)
      && !(error instanceof UnauthorizedError);

    isServerError && logger.error(error);

    return res.status(error.statusCode).json({
      status: error.status,
      message: isServerError ? publicMessage : error.message,
    });
  }
  next();
};