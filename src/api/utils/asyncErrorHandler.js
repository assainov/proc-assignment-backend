/**
 * Higher-order function to catch asynchronous route errors and pass them to the error handling middleware.
 *
 * @function
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A new function that wraps the original function with a try-catch block.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
export const asyncErrorHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    return next(e);
  }
};