import pino from 'pino';
import {Loggable} from '@shared/logging/loggable.interface';

export class Logger implements Loggable {
  private static INSTANCE: Logger | null = null;

  private logger = pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });

  private constructor() {}

  public static getInstance(): Logger {
    if (this.INSTANCE === null) {
      this.INSTANCE = new Logger();
    }
    return this.INSTANCE;
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string, err?: unknown): void {
    this.logger.error(message, err);
  }
}
