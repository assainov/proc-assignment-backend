import {getTimeMinutesAgo} from './utils.js';

export default async (payload, cachedTimeMinutes, searchRepository, /* externalSearchService */) => {
  if (!payload || !payload.search || !payload.search.length) {
    throw new Error('search field cannot be empty');
  }

  const validTimeRange = {
    from: getTimeMinutesAgo(cachedTimeMinutes).toISOString(),
    to: new Date().toISOString(),
  };

  const validRecord = await searchRepository.searchWithinTimeRange(
    payload,
    validTimeRange
  );

  return validRecord ? validRecord.results : null;
};