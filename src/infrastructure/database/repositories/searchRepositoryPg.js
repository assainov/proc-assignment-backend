import {Between} from 'typeorm';
import appDataSource from '../data-source.js';
import {SearchEntity} from '../entities/searchEntity.js';
import {ClientError} from '../../../api/entities/errors.js';
import SearchRecord from '../../../domain/searchRecord/searchRecord.js';
import logger from '../../../api/utils/logger.js';

const searchRepository = appDataSource.getRepository(SearchEntity);

/**
 * @file searchRepositoryPg.js
 * @description This module provides functions to search search data within a time range in a PostgreSQL database.
 * @module searchRepositoryPg
 */
export default () => ({
  /**
   * Searches for cached data within a specified time range.
   * 
   * @function searchWithinTimeRange
   * @async
   * @param {Object} payload - The search payload containing search parameters.
   * @param {string} payload.search - The search term.
   * @param {number} [payload.page] - The page number for pagination.
   * @param {Object} validTimeRange - The valid time range for the search.
   * @param {Date} validTimeRange.from - The start date and time of the range.
   * @param {Date} validTimeRange.to - The end date and time of the range.
   * @throws {ClientError} If the search parameter is empty.
   * @returns {Promise<SearchRecord|null>} The cached search record if found, otherwise null.
   */
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

  /**
   * Caches search data asynchronously.
   * 
   * @function addAsync
   * @async
   * @param {Object} searchPayload - The payload containing search data to be cached.
   * @param {Date} searchPayload.datetime - The date and time of the search.
   * @param {Object} searchPayload.payload - The search parameters.
   * @param {Array} searchPayload.results - The search results.
   * @returns {Promise<void>}
   */
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