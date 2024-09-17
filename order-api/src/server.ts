import 'reflect-metadata';
import 'express-async-errors';
import '@src/dependency-injection.config';
import express, {Express, NextFunction, Request, Response} from 'express';
import {configureRoutes} from '@infra/rest/order-api.routes';
import {Environment} from '@src/server-environment.config';
import {Logger} from '@shared/logging/logger.adapter';
import {initContext} from '@shared/context/async-local-storage.context';
import mongoose from 'mongoose';
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
  app.use(
    express.json({
      strict: true,
      verify(req: Request, res: Response, buf: Buffer, encoding: string) {
        try {
          JSON.parse(buf.toString());
        } catch (error) {
          res.status(400).json({
            status: 400,
            message: 'Invalid JSON format',
          });
          throw Error('Invalid JSON format');
        }
      },
    })
  );
  app.use(express.urlencoded({extended: false}));
}

function configureHttpRoutes(app: Express): void {
  app.use(initContext);

  app.use(Environment.SERVER_BASE_ROUTE, configureRoutes());

  // route not found middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      status: 404,
      message: `Cannot ${req.method} ${req.originalUrl}`,
    });
  });

  // global error handler middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  });
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
      logger.info(`Server running on port #${port}`);
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
