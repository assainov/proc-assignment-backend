import searchRepositoryPg from '../../../infrastructure/database/repositories/searchRepositoryPg.js';
import SwapiService from '../../../infrastructure/swapi/swapiService.js';
import searchController from './searchController.js';

export default (express) => {
  const router = express.Router();

  const searchRepository = searchRepositoryPg();
  const externalSearchService = new SwapiService();

  // load controller with dependencies
  const controller = searchController(searchRepository, externalSearchService);

  router
    .route('/')
    .get(controller.searchHandler);

  router
    .route('/')
    .post(controller.addSearchHandler);

  return router;
};