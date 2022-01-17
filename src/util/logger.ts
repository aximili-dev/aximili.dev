import {
  createLogger as _createLogger,
  format,
  Logger,
} from 'winston';
import { Console } from 'winston/lib/winston/transports';

import { Env } from './env';

const {
  combine, colorize, errors, label, printf, timestamp, uncolorize,
} = format;

const devFormat = printf(({ error, level, message, label, timestamp }) =>
  `[${timestamp}] ${label} ${level} - ${message}${error ?? ''}`);

const prodFormat = printf(({ level, message, label }) =>
  `${label} ${level} - ${message}`);

export function createLogger(name: string, env: Env): Logger {
  if (env === 'prod') {
    return _createLogger({
      level: 'info',
      format: combine(
        label({ label: name }),
        uncolorize(),
        prodFormat,
      ),
      transports: [ new Console() ],
    });
  } else {
    return _createLogger({
      level: 'debug',
      format: combine(
        errors({ stack: true }),
        label({ label: name }),
        timestamp(),
        colorize(),
        devFormat,
      ),
      transports: [ new Console() ],
    });
  }
}
