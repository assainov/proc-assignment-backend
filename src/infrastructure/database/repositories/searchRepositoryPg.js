import {Between} from 'typeorm';
import appDataSource from '../data-source.js';
import {SearchEntity} from '../entities/searchEntity.js';
import {ClientError} from '../../../api/entities/errors.js';
import SearchRecord from '../../../domain/searchRecord/searchRecord.js';

const searchRepository = appDataSource.getRepository(SearchEntity);

export default () => ({
  searchWithinTimeRange: async (payload, validTimeRange) =>
  {
    const {search, page} = payload;

    if (!search || !search.length) {
      throw new ClientError('search parameter cannot be empty');
    }

    console.info('Started searching for cached data');
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
      console.info('No cached data found');
      return null;
    }

    console.info('Found cached data');
    return new SearchRecord(result.datetime, result.payload, result.results);
  },

  addAsync: async (searchPayload) => {
    console.info('Started caching search data');

    await searchRepository.save({
      datetime: searchPayload.datetime,
      payload: searchPayload.payload,
      results: searchPayload.results,
    });

    console.info('Finished caching search data');
  }
});