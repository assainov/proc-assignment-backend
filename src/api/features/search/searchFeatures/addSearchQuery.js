
export default async (payload, cachedTimeMinutes, searchRepository) => {
  if (!payload || !payload.search || !payload.search.length) {
    throw new Error('search field cannot be empty');
  }

  await searchRepository.addAsync(payload);

  return;
};