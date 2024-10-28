import authRouter from './auth/authRouter.js';
import searchRouter from './search/searchRouter.js';

export default (app, express) => {
  app.use('/api/v1/search', searchRouter(express));
  app.use('/api/v1/auth', authRouter(express));
};