import {EntitySchema} from 'typeorm';

/**
 * Search entity schema.
 * ATTENTION: The requested schema definition (datetime payload results)
 * will create a concurrency problem when trying to insert the same search by multiple users.
 * Therefore, we're setting a primary index key which will be auto-incremented.
 */
export const SearchEntity = new EntitySchema({
  name: 'search',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
    },
    datetime: {
      type: 'timestamp with time zone',
    },
    payload: {
      type: 'jsonb',
    },
    results: {
      type: 'json'
    },
  },
  indices: [
    {
      name: 'IDX_SEARCH_DATETIME_PAYLOAD',
      unique: true,
      columns: ['datetime', 'payload'],
    },
  ]
});