import express, {Router} from 'express';
import {container} from 'tsyringe';
import {HttpRoute} from '@infra/rest/http-route.interface';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {ProcessPaymentController} from '@infra/rest/controllers/process-payment.controller';

const routes: HttpRoute[] = [
  {
    method: 'get',
    path: '/health',
    controller: HealthCheckController,
  },
  {
    method: 'post',
    path: '/process-payment',
    controller: ProcessPaymentController,
  },
];

export function configureRoutes(): Router {
  const router = express.Router();

  routes.forEach((route: HttpRoute) => {
    const controller = container.resolve(route.controller);

    router[route.method](route.path, (req, res) => {
      controller.handle(req, res);
    });
  });

  return router;
}
