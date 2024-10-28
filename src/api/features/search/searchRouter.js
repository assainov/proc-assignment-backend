import searchRepositoryPg from '../../../infrastructure/database/repositories/searchRepositoryPg.js';
import swapiService from '../../../infrastructure/swapi/swapiService.js';
import {authenticate} from '../../middleware/authMiddleware.js';
import {asyncErrorHandler} from '../../utils/asyncErrorHandler.js';
import searchController from './searchController.js';

/**
 * Initializes the search router with the provided Express instance.
 *
 * @param {Object} express - The Express instance.
 * @returns {Object} The configured router.
 *
 * @description
 * This function sets up a router for handling search-related requests. It initializes the necessary
 * dependencies, such as the search repository and external search service, and loads the search
 * controller with these dependencies. The router defines a single GET route at the root path ('/')
 * which is protected by an authentication middleware and handles search requests using the 
 * `searchHandler` method of the search controller.
 */
export default (express) => {
  const router = express.Router();

  // This is okay for such a small application, but in a larger application, 
  // it would be better to use a dependency injection container
  const searchRepository = searchRepositoryPg();
  const externalSearchService = swapiService();

  // load controller with dependencies
  const controller = searchController(searchRepository, externalSearchService);

  /**
   * @route GET /
   * @middleware authenticate - Middleware to authenticate the request.
   * @handler asyncErrorHandler(controller.searchHandler) - Handles the search request.
   */
  router
    .route('/')
    .get(authenticate, asyncErrorHandler(controller.searchHandler));

  return router;
};