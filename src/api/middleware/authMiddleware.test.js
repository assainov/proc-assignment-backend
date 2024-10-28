import {authenticate} from './authMiddleware.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger'; //eslint-disable-line no-unused-vars

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

// Shut down the error in test logs
jest.mock('../utils/logger', () => ({
  error: jest.fn()
}));

describe('authenticate', () => {
  it('should throw an error if Authorization header is missing', () => {
    const req = {
      header: jest.fn().mockReturnValue(null)
    };

    const res = {};
    const next = jest.fn();

    expect(() => authenticate(req, res, next)).toThrow('Authorization failed.');
  });

  it('should throw an error if Authorization header is invalid', () => {
    const req = {
      header: jest.fn().mockReturnValue('Invalid')
    };
    const res = {};
    const next = jest.fn();

    expect(() => authenticate(req, res, next)).toThrow('Authorization failed.');
  });

  it('should throw an error if JWT verification fails', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token')
    };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error();
    });

    expect(() => authenticate(req, res, next)).toThrow('Authorization failed.');
  });

  it('should set req.user to the payload if JWT verification passes', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer token')
    };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockReturnValue({email: 'email'});

    authenticate(req, res, next);

    expect(req.user).toEqual({email: 'email'});
  });
});