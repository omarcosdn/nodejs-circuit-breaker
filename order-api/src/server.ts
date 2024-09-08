import 'reflect-metadata';
import express from 'express';
import {container} from 'tsyringe';
import {OrderApiRoutes} from '@infra/rest/order-api.routes';
import {Loggable} from '@shared/logging/loggable.interface';
import {Token} from '@src/dependency-injection.config';
import {Env} from '@src/server.config';

const OrderApi = express();
OrderApi.use(express.json());
OrderApi.use(express.urlencoded({extended: true}));
OrderApi.use('/order-api', OrderApiRoutes);

const logger = container.resolve<Loggable>(Token.LOGGABLE);

const PORT = Env.SERVER_PORT;
OrderApi.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
