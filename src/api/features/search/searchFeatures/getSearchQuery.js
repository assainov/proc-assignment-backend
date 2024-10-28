import SearchRecord from '../../../../domain/searchRecord/searchRecord.js';
import {ClientError} from '../../../entities/errors.js';
import {getCurrentTime, getTimeMinutesAgo} from './utils.js';

/**
 * Searches for people based on the provided payload and caches the results 
 * before returning them to the client.
 *
 * @param {Object} payload - The search payload containing search parameters.
 * @param {number} cachedTimeMinutes - The time in minutes to consider the cache valid.
 * @param {Object} searchRepository - The repository to interact with the search cache.
 * @param {Object} searchService - The service to perform the actual search if cache is invalid.
 * @returns {Promise<Array>} - The search results.
 * @throws {ClientError} - If the search field in the payload is empty.
 *
 */
export default async (payload, cachedTimeMinutes, searchRepository, searchService) => {
  if (!payload || !payload.search || !payload.search.length) {
    throw new ClientError('search field cannot be empty');
  }

  const validTimeRange = {
    from: getTimeMinutesAgo(cachedTimeMinutes),
    to: getCurrentTime(),
  };

  const validSearchRecord = await searchRepository.searchWithinTimeRange(
    payload,
    validTimeRange
  );

  if (validSearchRecord) return validSearchRecord.results;

  // The cache is empty or expired, so we need to fetch the data from the SWAPI
  const results = await searchService.searchPeople(payload.search, payload.page);

  const searchPayload = new SearchRecord(getCurrentTime(), payload, results);

  await searchRepository.addAsync(searchPayload);

  return searchPayload.results;
};