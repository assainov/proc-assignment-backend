import dotenv from 'dotenv';
dotenv.config();

const getConfig = () => ({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  CACHED_TIME_MINUTES: process.env.CACHED_TIME_MINUTES,
  CLIENT_URL: process.env.CLIENT_URL || '*',

  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
});

export default getConfig();
