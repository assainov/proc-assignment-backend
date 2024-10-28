import logger from '../../api/utils/logger.js';

const baseUrl = process.env.SWAPI_BASE_URL;

if (!baseUrl) {
  throw new Error('SWAPI_BASE_URL is not defined');
}

export default () => ({
  searchPeople: async(query, page=1) => {
    if (!query) {
      throw new Error('query cannot be empty');
    }

    logger.info('Started fetching data from SWAPI');
    const response = await fetch(`${baseUrl}/people/?search=${query}&page=${page}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    logger.info('Finished fetching data from SWAPI');

    return data.results;
  }
});