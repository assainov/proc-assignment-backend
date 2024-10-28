import {ServerError} from '../entities/errors.js';

const publicMessage = 'Something went wrong. Please try again later.';

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;

  // All errors from async & non-async route above will be handled here
  if (error) {
    // console.log(error)
    return res.status(error.statusCode).json({
      status: error.status,
      message: error instanceof ServerError ? publicMessage : error.message,
    });
  }
  next();
};