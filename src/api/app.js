import express from 'express';
import registerMiddleware from './middleware/registerMiddleware.js';
import registerControllers from './controllers/registerControllers.js';
import config from './config.js';

const app = express();

registerMiddleware(app, express);
registerControllers(app, express);

app.listen(config.PORT, () => {
  console.log(`Server is running on port: ${config.PORT}`);
});