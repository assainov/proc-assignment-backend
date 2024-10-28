import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import {UnauthorizedError} from '../entities/errors.js';

/**
 * Middleware to authenticate a user based on the Authorization header.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @throws {UnauthorizedError} If the Authorization header is missing or invalid.
 * 
 * @example
 * // Usage in an Express route
 * import express from 'express';
 * import { authenticate } from './path/to/authMiddleware';
 * 
 * const app = express();
 * 
 * app.get('/protected-route', authenticate, (req, res) => {
 *   res.send('This is a protected route');
 * });
 */
export const authenticate = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    throw new UnauthorizedError('Authorization failed.');
  }

  if (!header.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization failed.');
  }

  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    logger.error(error);

    throw new UnauthorizedError('Authorization failed.');
  }
};