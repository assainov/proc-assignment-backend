import bcrypt from 'bcryptjs';
import logger from '../../api/utils/logger.js';

/**
 * Encryption Service
 * 
 * Provides methods to hash and compare passwords using bcrypt.
 * 
 * @module encryptionService
 */
export default () => ({

  /**
   * Hashes a password.
   * 
   * @function hashPassword
   * @async
   * @param {string} password - The password to hash.
   * @throws {Error} If the password is empty.
   * @returns {Promise<string>} The hashed password.
   */
  hashPassword: async(password) => {
    if (!password) {
      throw new Error('password cannot be empty');
    }

    logger.info('Started encypting password');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    logger.info('Finished encypting password');

    return hashedPassword;
  },

  /**
   * Compares a password with a hashed password.
   * 
   * @function comparePassword
   * @async
   * @param {string} password - The plain text password.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @throws {Error} If the password or hashedPassword is empty.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   */
  comparePassword: async(password, hashedPassword) => {
    if (!password || !hashedPassword) {
      throw new Error('password and hashedPassword cannot be empty');
    }

    logger.info('Started comparing password');

    const passwordMatches = await bcrypt.compare(password, hashedPassword);

    logger.info('Finished comparing password');

    return passwordMatches;
  }
});