import {DataSource} from 'typeorm';
import config from '../../api/config.js';
import {SearchEntity} from './entities/searchEntity.js';
import {UserEntity} from './entities/userEntity.js';

const dataSource = new DataSource({
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  autoLoadEntities: true,
  entities: [SearchEntity, UserEntity],
  migrations: ['src/infrastructure/database/migrations/**/*{.js,.ts}'],
  subscribers: ['src/infrastructure/database/subscribers/**/*{.js,.ts}'],
});

export default dataSource;