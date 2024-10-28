import logger from '../../../api/utils/logger.js';
import dataSource from '../data-source.js';

/**
 * Initializes the TypeORM data source.
 * 
 * This function is used during the application startup to set up the
 * TypeORM data source.
 * 
 * @returns {Promise<void>} A promise that resolves when the data source has been initialized.
 */
export const initializeDatabase = () => dataSource
  .initialize()
  .then(() => {
    logger.info('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization:', err);
  });
