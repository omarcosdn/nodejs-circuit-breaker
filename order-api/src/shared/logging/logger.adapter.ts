import pino from 'pino';
import {injectable} from 'tsyringe';
import {Loggable} from '@shared/logging/loggable.interface';

@injectable()
export class Logger implements Loggable {
  private logger = pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, err?: unknown): void {
    this.logger.error(message, err);
  }
}
