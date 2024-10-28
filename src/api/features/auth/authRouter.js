import userRepositoryPg from '../../../infrastructure/database/repositories/userRepositoryPg.js';
import {asyncErrorHandler} from '../../utils/asyncErrorHandler.js';
import authController from './authController.js';

export default (express) => {
  const router = express.Router();

  const userRepository = userRepositoryPg();

  // load controller with dependencies
  const controller = authController(userRepository);

  // GET endpoints
  router
    .route('/login')
    .get(asyncErrorHandler(controller.loginHandler));

  // router
  //   .route('/signup')
  //   .get(controller.signup);

  return router;
};