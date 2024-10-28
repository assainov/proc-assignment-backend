import {getTimeMinutesAgo} from './utils.js';

export default async (payload, cachedTimeMinutes, searchRepository) => {
  if (!payload || !payload.search || !payload.search.length) {
    throw new Error('search field cannot be empty');
  }

  const validTimeRange = {
    from: getTimeMinutesAgo(cachedTimeMinutes).toISOString(),
    to: new Date().toISOString(),
  };

  const results = await searchRepository.findByPayload(
    {
      search: payload.search,
      page: payload.page && payload.page.length > 1 ? payload.page : 1,
    },
    validTimeRange
  );

  return results;
};