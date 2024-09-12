import 'reflect-metadata';
import 'express-async-errors';
import '@src/dependency-injection.config';
import express, {NextFunction, Request, Response} from 'express';
import {OrderApiRoutes} from '@infra/rest/order-api.routes';
import {Environment} from '@src/server-environment.config';
import {BusinessError} from '@shared/exceptions/business.error';
import {Logger} from '@shared/logging/logger.adapter';

const OrderApi = express();
OrderApi.use(express.json());
OrderApi.use(express.urlencoded({extended: true}));
OrderApi.use('/order-api', OrderApiRoutes);

const logger = Logger.getInstance();

OrderApi.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BusinessError) {
    const status = err.getStatusCode();
    return res.status(status).json({
      status: status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
});

const PORT = Environment.SERVER_PORT;
OrderApi.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
