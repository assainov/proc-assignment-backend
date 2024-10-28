import userRepositoryPg from '../../../infrastructure/database/repositories/userRepositoryPg.js';
import encryptionService from '../../../infrastructure/security/encryptionService.js';
import jwtTokenService from '../../../infrastructure/security/jwtTokenService.js';
import {authenticate} from '../../middleware/authMiddleware.js';
import {asyncErrorHandler} from '../../utils/asyncErrorHandler.js';
import authController from './authController.js';

export default (express) => {
  const router = express.Router();

  const userRepository = userRepositoryPg();
  const encryptService = encryptionService();
  const tokenService = jwtTokenService();

  // load controller with dependencies
  const controller = authController(userRepository, encryptService, tokenService);

  router
    .route('/login')
    .post(asyncErrorHandler(controller.loginHandler));

  router
    .route('/signup')
    .post(asyncErrorHandler(controller.signupHandler));

  router
    .route('/me')
    .get(authenticate, asyncErrorHandler(controller.meHandler));

  return router;
};