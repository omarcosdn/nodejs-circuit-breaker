import 'reflect-metadata';
import '@src/dependency-injection.config';
import express, {Express} from 'express';
import mongoose, {Error} from 'mongoose';
import {Logger} from '@shared/logging/logger.adapter';
import {Environment} from '@src/server-environment.config';
import {configureRoutes} from '@infra/rest/payment-api.routes';
import {Loggable} from '@shared/logging/loggable.interface';

class PaymentApplication {
  private readonly app: Express;
  private readonly port: number;
  private readonly logger: Loggable = Logger.getInstance();

  constructor() {
    this.app = express();
    this.port = Environment.SERVER_PORT;
  }

  public async bootstrap(): Promise<void> {
    try {
      this.logger.info('Starting server...');

      this.configureMiddleware();
      this.configureRoutes();

      await this.initializeExternalServices();
      await this.startServer();

      this.logger.info(`Server running on port ${this.port}`);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`An error occurred during application bootstrap: ${error.message}`);
      } else {
        this.logger.error('An unknown error occurred during application bootstrap');
      }
      process.exit(1);
    }
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
  }

  private configureRoutes(): void {
    this.app.use(Environment.SERVER_BASE_ROUTE, configureRoutes());
  }

  private async initializeExternalServices(): Promise<void> {
    try {
      const database = `${Environment.MONGO_DATABASE_HOST}/${Environment.MONGO_DATABASE_NAME}`;
      await mongoose.connect(database);
      this.logger.info('MongoDB connected successfully');
    } catch (error) {
      throw new Error('Failed to connect to MongoDB');
    }
  }

  private async startServer(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.app.listen(this.port, (error?: Error) => {
        if (error !== undefined) {
          this.logger.error(`Failed to start server: ${error.message}`);
          reject(error);
        }

        resolve();
      });
    });
  }
}

(async () => {
  const app = new PaymentApplication();
  await app.bootstrap();
})();

export const shutdown = async (stream: any): Promise<void> => {
  console.log(`Received ${stream}. Gracefully shutting down...`);

  await mongoose.connection.close();

  process.exit(0);
};

process.on('SIGINT', async (stream) => {
  await shutdown(stream);
});

process.on('SIGTERM', async (stream) => {
  await shutdown(stream);
});
