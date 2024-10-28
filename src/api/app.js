import express from 'express';
import registerMiddleware from './middleware/registerMiddleware.js';
import registerControllers from './features/registerControllers.js';
import config from './config.js';
import {initializeDatabase} from '../infrastructure/database/helpers/initializeDatabase.js';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware.js';
import logger from './utils/logger.js';

initializeDatabase();

const app = express();

registerMiddleware(app, express);
registerControllers(app, express);

app.use(errorHandlingMiddleware);

app.listen(config.PORT, () => {
  logger.info(`Server is running on port: ${config.PORT}`);
});