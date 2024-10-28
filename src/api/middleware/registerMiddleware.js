import helmet from 'helmet';
import cors from 'cors';
import config from '../config.js';
import pinoHttp from 'pino-http';
import {pinoLogger} from '../utils/logger.js';

export default function registerMiddleware(app, express) {

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.use(cors({origin: config.CLIENT_URL}));
  app.use(helmet());
  app.use(pinoHttp({pinoLogger}));
}