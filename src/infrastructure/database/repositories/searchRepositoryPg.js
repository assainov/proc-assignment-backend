import {Between} from 'typeorm';
import appDataSource from '../data-source.js';
import {SearchEntity} from '../entities/searchEntity.js';
import {ClientError} from '../../../api/entities/errors.js';
import SearchRecord from '../../../domain/searchRecord/searchRecord.js';
import logger from '../../../api/utils/logger.js';

const searchRepository = appDataSource.getRepository(SearchEntity);

export default () => ({
  searchWithinTimeRange: async (payload, validTimeRange) =>
  {
    const {search, page} = payload;

    if (!search || !search.length) {
      throw new ClientError('search parameter cannot be empty');
    }

    logger.info('Started searching for cached data');
    logger.debug('Search payload:', payload);
    const result = await searchRepository.findOne({
      where: {
        payload: {
          search: payload.search,
          ...(page ? {page} : {})
        },
        datetime: Between(validTimeRange.from, validTimeRange.to),
      },
    });

    if (result === null) {
      logger.info('No cached data found');
      return null;
    }

    logger.info('Found cached data');
    logger.debug('Cached data:', result);
    return new SearchRecord(result.datetime, result.payload, result.results);
  },

  addAsync: async (searchPayload) => {
    logger.info('Started caching search data');
    logger.debug('searchPayload:', searchPayload);

    await searchRepository.save({
      datetime: searchPayload.datetime,
      payload: searchPayload.payload,
      results: searchPayload.results,
    });

    logger.info('Finished caching search data');
  }
});