import searchRepositoryPg from '../../../infrastructure/database/repositories/searchRepositoryPg.js';
import SwapiService from '../../../infrastructure/swapi/swapiService.js';
import {asyncErrorHandler} from '../../utils/asyncErrorHandler.js';
import searchController from './searchController.js';

export default (express) => {
  const router = express.Router();

  const searchRepository = searchRepositoryPg();
  const externalSearchService = new SwapiService();

  // load controller with dependencies
  const controller = searchController(searchRepository, externalSearchService);

  router
    .route('/')
    .get(asyncErrorHandler(controller.searchHandler));

  router
    .route('/')
    .post(asyncErrorHandler(controller.addSearchHandler));

  return router;
};