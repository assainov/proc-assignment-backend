import bcrypt from 'bcryptjs';
import logger from '../../api/utils/logger.js';

export default () => ({
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