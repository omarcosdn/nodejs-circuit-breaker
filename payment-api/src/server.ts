import 'reflect-metadata';
import express from 'express';
import {PaymentApiRoutes} from '@infra/rest/payment-api.routes';
import {container} from 'tsyringe';
import {Loggable} from '@shared/logging/loggable.interface';
import {Token} from '@src/dependency-injection.config';
import {Env} from '@src/server.config';

const PaymentApi = express();
PaymentApi.use(express.json());
PaymentApi.use(express.urlencoded({extended: true}));
PaymentApi.use('/payment-api', PaymentApiRoutes);

const logger = container.resolve<Loggable>(Token.LOGGABLE);

const PORT = Env.SERVER_PORT;
PaymentApi.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
