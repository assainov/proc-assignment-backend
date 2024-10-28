import {DataSource} from 'typeorm';
import config from '../../api/config.js';

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
  entities: ['src/infrastructure/entities/**/*{.js,.ts}'],
  migrations: ['src/infrastructure/migrations/**/*{.js,.ts}'],
  subscribers: ['src/infrastructure/subscribers/**/*{.js,.ts}'],
});

export default dataSource;