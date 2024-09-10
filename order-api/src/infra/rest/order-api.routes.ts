import {container} from 'tsyringe';
import express from 'express';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {DefaultPlaceOrderController} from '@infra/rest/controllers/place-order.controller';

const OrderApiRoutes = express.Router();

// Health Check
const healthCheckController = container.resolve(HealthCheckController);
OrderApiRoutes.get('/health', (req, res) => healthCheckController.handle(req, res));

// Payment Management
const placeOrderController = container.resolve(DefaultPlaceOrderController);
OrderApiRoutes.post('/place-order', (req, res) => placeOrderController.handle(req, res));

export {OrderApiRoutes};
