import {Between} from 'typeorm';
import appDataSource from '../data-source.js';
import {SearchEntity} from '../entities/searchEntity.js';
import {ClientError} from '../../../api/entities/errors.js';

const searchRepository = appDataSource.getRepository(SearchEntity);

export default () => ({
  searchWithinTimeRange: async (payload, validTimeRange) =>
  {
    const {search, page} = payload;

    if (!search || !search.length) {
      throw new ClientError('search parameter cannot be empty');
    }

    const result = await searchRepository.findOne({
      where: {
        payload: {
          search: payload.search,
          ...(page ? {page} : {})
        },
        datetime: Between(validTimeRange.from, validTimeRange.to),
      },
    });

    return result;
  },

  addAsync: async (datetime, payload, results) => await searchRepository.save({
    datetime,
    payload,
    results,
  })
});