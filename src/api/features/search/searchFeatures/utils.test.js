import {getTimeMinutesAgo} from './utils';

describe('getTimeMinutesAgo', () => {
  it('should throw an error if minutes is missing', () => {
    expect(() => getTimeMinutesAgo()).toThrow('minutes is required');
  });
});