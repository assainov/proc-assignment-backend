import {ClientError, NotFoundError} from '../entities/errors.js';
import logger from '../utils/logger.js';

const publicMessage = 'Something went wrong. Please try again later.';

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  // All errors from async & non-async route above will be handled here
  if (error) {
    const isServerError = !(error instanceof ClientError) && !(error instanceof NotFoundError);

    isServerError && logger.error(error);

    return res.status(error.statusCode).json({
      status: error.status,
      message: isServerError ? publicMessage : error.message,
    });
  }
  next();
};