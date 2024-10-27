import dotenv from 'dotenv';
dotenv.config();

const getConfig = () => ({
  PORT: process.env.PORT || 3000,
  CACHED_TIME: process.env.CACHED_TIME,
  CLIENT_URL: process.env.CLIENT_URL || '*',
});

export default getConfig();
