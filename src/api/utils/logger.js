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

/**
 * Logger utility using pinoLogger for logging messages at different levels.
 * 
 * @namespace logger
 * 
 * @property {function} debug - Logs debug level messages.
 * @property {function} info - Logs info level messages.
 * @property {function} error - Logs error level messages.
 * @property {function} warn - Logs warn level messages.
 * 
 * Each logging function accepts a variable number of arguments and logs each argument separately.
 * 
 * @example
 * logger.debug('Debug message');
 * logger.info('Info message');
 * logger.error('Error message');
 * logger.warn('Warning message');
 */
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