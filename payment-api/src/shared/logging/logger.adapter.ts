import pino from 'pino';
import { injectable } from 'tsyringe';
import { Loggable } from './loggable.interface';

@injectable()
export class Logger implements Loggable {
    private logger = pino({
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    });

    info(message: string): void {
        this.logger.info(message);
    }

    error(message: string): void {
        this.logger.error(message);
    }
}