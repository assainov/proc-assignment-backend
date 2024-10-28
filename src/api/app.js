import express from 'express';
import registerMiddleware from './middleware/registerMiddleware.js';
import registerControllers from './features/registerControllers.js';
import config from './config.js';
import {initializeDatabase} from '../infrastructure/database/helpers/initializeDatabase.js';

initializeDatabase();

const app = express();

registerMiddleware(app, express);
registerControllers(app, express);

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});