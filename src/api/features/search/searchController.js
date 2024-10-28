import getSearchQuery from './searchFeatures/getSearchQuery.js';
import config from '../../config.js';

export default (searchRepository, externalSearchService) => {

  const searchHandler = async (req, res) => {
    const payload = req.query;

    const cachedTimeMinutes = config.CACHED_TIME_MINUTES;
    const results = await getSearchQuery(payload, cachedTimeMinutes, searchRepository, externalSearchService);

    return res.status(200).json(results);
  };

  return {
    searchHandler,
  };
};