import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import {UnauthorizedError} from '../entities/errors.js';

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
    console.log('payload', payload);
    req.user = payload;
    next();
  } catch (error) {
    logger.error(error);

    throw new UnauthorizedError('Authorization failed.');
  }
};