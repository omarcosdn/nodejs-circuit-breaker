import 'reflect-metadata';
import '@src/dependency-injection.config';
import express, {Express} from 'express';
import mongoose from 'mongoose';
import {Logger} from '@shared/logging/logger.adapter';
import {Environment} from '@src/server-environment.config';
import {configureRoutes} from '@infra/rest/payment-api.routes';
import {Loggable} from '@shared/logging/loggable.interface';

const logger: Loggable = Logger.getInstance();

async function bootstrap(): Promise<void> {
  const app = createServer();
  await initializeDatabase();
  startServer(app);
}

function createServer(): Express {
  logger.info('Starting server...');

  const app = express();
  configureMiddleware(app);
  configureHttpRoutes(app);

  return app;
}

function configureMiddleware(app: Express): void {
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
}

function configureHttpRoutes(app: Express): void {
  app.use(Environment.SERVER_BASE_ROUTE, configureRoutes());
}

async function initializeDatabase(): Promise<void> {
  try {
    const database = `${Environment.MONGO_DATABASE_HOST}/${Environment.MONGO_DATABASE_NAME}`;
    await mongoose.connect(database);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error');
    throw new Error('Failed to connect to MongoDB');
  }
}

function startServer(app: Express): void {
  const port = Environment.SERVER_PORT;

  app
    .listen(port, () => {
      logger.info(`Server running on port ${port}`);
    })
    .on('error', (error) => {
      logger.error(`Failed to start server: ${error.message}`);
      process.exit(1);
    });
}

(async () => {
  await bootstrap();
})();

async function shutdown(signal: string): Promise<void> {
  console.log(`Received ${signal}. Gracefully shutting down...`);
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(`Error during shutdown: ${(error as Error).message}`);
    process.exit(1);
  }
}

process.on('SIGINT', async (signal) => await shutdown(signal));
process.on('SIGTERM', async (signal) => await shutdown(signal));
