import pino from 'pino';
import {format} from 'date-fns';
import config from '../config.js';

const targets = [
  {
    target  : 'pino-pretty',
    options : {
      colorize     : true,
      timestampKey : 'time',
      singleLine   : false,
      hideObject   : !(config.LOG_LEVEL === 'debug'),
      ignore       : 'hostname',
    },
  }
];

const transport = pino.transport({
  targets,
});

export const pinoLogger = pino(
  {
    level     : config.LOG_LEVEL || 'info',
    timestamp : () =>
      `,"time":"${format(Date.now(), 'dd-MMM-yyyy HH:mm:ss sss')}"`,
  },
  transport
);

const logger = {
  debug: (...args) => {
    args.map(arg => {
      pinoLogger.debug(arg);
    });
  },
  info: (...args) => {
    args.map(arg => {
      pinoLogger.info(arg);
    });
  },
  error: (...args) => {
    args.map(arg => {
      pinoLogger.error(arg);
    });
  },
  warn: (...args) => {
    args.map(arg => {
      pinoLogger.warn(arg);
    });
  },
};

export default logger;