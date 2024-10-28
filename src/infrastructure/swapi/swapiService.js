export default class SwapiService {
  constructor() {
    this.baseUrl = process.env.SWAPI_BASE_URL;
  }

  async searchPeople(query, page=1) {
    if (!query) {
      throw new Error('query cannot be empty');
    }

    try {
      const response = await fetch(`${this.baseUrl}/people/?search=${query}&page=${page}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}