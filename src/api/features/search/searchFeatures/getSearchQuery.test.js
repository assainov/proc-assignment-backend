import getSearchQuery from './getSearchQuery.js';

/**
 * Feature tests for the getSearchQuery function.
 */
describe('getSearchQuery', () => {
  it('should throw an error if the search field is empty', async () => {
    const payload = {
      search: ''
    };
    const cachedTimeMinutes = 5;
    const searchRepository = {
      searchWithinTimeRange: jest.fn()
    };
    const searchService = {
      searchPeople: jest.fn()
    };

    try {
      await getSearchQuery(payload, cachedTimeMinutes, searchRepository, searchService);
    } catch (error) {
      expect(error.message).toBe('search field cannot be empty');
    }
  });

  it('should return the search results if the cache is valid', async () => {
    const payload = {
      search: 'Luke Skywalker',
      page: 1
    };
    const cachedTimeMinutes = 5;
    const searchRepository = {
      searchWithinTimeRange: jest.fn().mockReturnValue({
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
          }
        ]
      })
    };
    const searchService = {
      searchPeople: jest.fn()
    };

    const results = await getSearchQuery(payload, cachedTimeMinutes, searchRepository, searchService);

    expect(results).toEqual([
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
      }
    ]);
  });

  it('should return the search results if the cache is invalid', async () => {
    const payload = {
      search: 'Darth',
      page: 1
    };
    const cachedTimeMinutes = 5;
    const searchRepository = {
      searchWithinTimeRange: jest.fn().mockReturnValue(null),
      addAsync: jest.fn()
    };
    const searchService = {
      searchPeople: jest.fn().mockReturnValue([
        {
          name: 'Darth Vader',
          height: '188',
          mass: '100',
          hair_color: 'none',
        }
      ])
    };

    const results = await getSearchQuery(payload, cachedTimeMinutes, searchRepository, searchService);

    expect(results).toEqual([
      {
        name: 'Darth Vader',
        height: '188',
        mass: '100',
        hair_color: 'none',
      }
    ]);
  });

  it('should add the search results to the cache if the cache is invalid', async () => {
    const payload = {
      search: 'Darth',
      page: 1
    };
    const cachedTimeMinutes = 5;
    const searchRepository = {
      searchWithinTimeRange: jest.fn().mockReturnValue(null),
      addAsync: jest.fn()
    };
    const searchService = {
      searchPeople: jest.fn().mockReturnValue([
        {
          name: 'Darth Vader',
          height: '188',
          mass: '100',
          hair_color: 'none',
        }
      ])
    };

    await getSearchQuery(payload, cachedTimeMinutes, searchRepository, searchService);

    expect(searchRepository.addAsync).toHaveBeenCalledTimes(1);
  });
});