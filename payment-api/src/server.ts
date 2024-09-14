import 'reflect-metadata';
import '@src/dependency-injection.config';
import express from 'express';
import mongoose from 'mongoose';
import {Logger} from '@shared/logging/logger.adapter';
import {Environment} from '@src/server-environment.config';
import {configureRoutes} from '@infra/rest/payment-api.routes';

const PaymentApi = express();
PaymentApi.use(express.json());
PaymentApi.use(express.urlencoded({extended: true}));
PaymentApi.use(Environment.SERVER_BASE_ROUTE, configureRoutes());

const logger = Logger.getInstance();

mongoose
  .connect(`${Environment.MONGO_DATABASE_HOST}/${Environment.MONGO_DATABASE_NAME}`)
  .then(() => {
    const PORT = Environment.SERVER_PORT;
    PaymentApi.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((reason) => {
    console.error(reason);
    logger.error('MongoDB connection error');
  });
