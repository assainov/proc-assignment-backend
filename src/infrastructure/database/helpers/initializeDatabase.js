import logger from '../../../api/utils/logger.js';
import dataSource from '../data-source.js';

export const initializeDatabase = () => dataSource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization:', err);
  });
