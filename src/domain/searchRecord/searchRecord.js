export default class SearchRecord {
  constructor(
    datetime,
    payload,
    results
  ) {
    this.datetime = datetime;
    this.payload = payload;
    this.results = results;
  }
}