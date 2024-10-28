import searchRepositoryPg from '../../../infrastructure/database/repositories/searchRepositoryPg.js';
import swapiService from '../../../infrastructure/swapi/swapiService.js';
import {asyncErrorHandler} from '../../utils/asyncErrorHandler.js';
import searchController from './searchController.js';

export default (express) => {
  const router = express.Router();

  // This is okay for such a small application, but in a larger application, 
  // it would be better to use a dependency injection container
  const searchRepository = searchRepositoryPg();
  const externalSearchService = swapiService();

  // load controller with dependencies
  const controller = searchController(searchRepository, externalSearchService);

  router
    .route('/')
    .get(asyncErrorHandler(controller.searchHandler));

  return router;
};