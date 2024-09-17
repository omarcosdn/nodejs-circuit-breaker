import {container} from 'tsyringe';
import express, {Router} from 'express';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {PlaceOrderController} from '@infra/rest/controllers/place-order.controller';
import {HttpRoute} from '@infra/rest/http-route.interface';

const routes: HttpRoute[] = [
  {
    method: 'get',
    path: '/health',
    controller: HealthCheckController,
  },
  {
    method: 'post',
    path: '/place-order',
    controller: PlaceOrderController,
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
