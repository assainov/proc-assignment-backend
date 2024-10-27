import userRepositoryPg from '../../../infrastructure/repositories/userRepositoryPg.js';
import authController from './authController.js';

export default (express) => {
  const router = express.Router();

  const userRepository = userRepositoryPg();

  // load controller with dependencies
  const controller = authController(userRepository);

  // GET endpoints
  router
    .route('/login')
    .get(controller.loginHandler);

  // router
  //   .route('/signup')
  //   .get(controller.signup);

  return router;
};