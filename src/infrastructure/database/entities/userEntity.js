import {EntitySchema} from 'typeorm';

export const UserEntity = new EntitySchema({
  name: 'users',
  columns: {
    email: {
      primary: true,
      type: 'varchar',
    },
    firstname: {
      type: 'varchar',
    },
    surname: {
      type: 'varchar',
    },
    hashedPassword: {
      type: 'varchar',
    },
  },
});