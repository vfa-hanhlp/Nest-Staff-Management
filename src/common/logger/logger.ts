import { Injectable, LoggerService } from '@nestjs/common';
import * as log4js from 'log4js';
import { Logger } from 'log4js';
import * as path from 'path';

@Injectable()
export class LeeLogger implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    log4js.configure({
      appenders: {
        out: { type: 'console' },
        app: {
          type: 'dateFile',
          filename: path.join('./logs', 'LOGGER'),
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          appender: {
            type: 'console',
          },
        },
      },
      categories: {
        default: {
          appenders: ['out', 'app'],
          level: 'debug',
        },
      },
    });
    this.logger = log4js.getLogger(`Lee-Blog: APP`);
  }
  public error(message: string, trace?: string) {
    this.logger.error(message);
  }
  public log(message: string) {
    this.logger.info(message);
  }
  public warn(message: string) {
    this.logger.warn(message);
  }
}
