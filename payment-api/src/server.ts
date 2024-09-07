import 'reflect-metadata';
import express from 'express';
import { PaymentApiRoutes } from './infra/rest/payment-api.routes';
import { Env } from './server.config';
import { container } from 'tsyringe';
import { Loggable } from './shared/logging/loggable.interface';
import { Token } from './dependency-injection.config';

const PaymentApi = express();
PaymentApi.use(express.json());
PaymentApi.use(express.urlencoded({ extended: true }));
PaymentApi.use('/payment-api', PaymentApiRoutes);

const logger = container.resolve<Loggable>(Token.LOGGABLE);

const PORT = Env.SERVER_PORT;
PaymentApi.listen(PORT, () => {
    logger.info(`Server running on port ${ PORT }`);
});