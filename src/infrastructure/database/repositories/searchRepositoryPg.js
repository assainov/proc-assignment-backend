import appDataSource from '../data-source.js';
import {SearchEntity} from '../entities/searchEntity.js';

const searchRepository = appDataSource.getRepository(SearchEntity);

export default () => ({
  findByPayload: async (payload, /* lastValidDateTime */) => await searchRepository.findOne({
    where: {
      payload: {
        search: payload.search
      }
    },
  }),

  addAsync: async (datetime, payload, results) => await searchRepository.save({
    datetime,
    payload,
    results,
  })
});