import pino from 'pino';
import {Loggable} from '@shared/logging/loggable.interface';
import {Context} from '@shared/context/async-local-storage.context';

export class Logger implements Loggable {
  private static INSTANCE: Logger | null = null;

  private readonly logger: pino.Logger = pino();

  private constructor() {}

  public static getInstance(): Logger {
    if (this.INSTANCE === null) {
      this.INSTANCE = new Logger();
    }
    return this.INSTANCE;
  }

  info(message: string): void {
    this.logWithTrace().info(message);
  }

  error(message: string, err?: unknown): void {
    this.logWithTrace().error(message, err);
  }

  private logWithTrace() {
    const traceId = Context.getTraceId();
    return this.logger.child({'trace-id': traceId});
  }
}
