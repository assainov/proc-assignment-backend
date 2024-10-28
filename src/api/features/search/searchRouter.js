import searchRepositoryPg from '../../../infrastructure/database/repositories/searchRepositoryPg.js';
import searchController from './searchController.js';

export default (express) => {
  const router = express.Router();

  const searchRepository = searchRepositoryPg();

  // load controller with dependencies
  const controller = searchController(searchRepository);

  router
    .route('/')
    .get(controller.searchHandler);

  router
    .route('/')
    .post(controller.addSearchHandler);

  return router;
};