import express from 'express';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {container} from 'tsyringe';
import {PlaceOrderController} from '@infra/rest/controllers/place-order.controller';

const OrderApiRoutes = express.Router();

// Health Check
const healthCheckController = container.resolve(HealthCheckController);
OrderApiRoutes.get('/health', (req, res) => healthCheckController.handle(req, res));

// Payment Management
const placeOrderController = container.resolve(PlaceOrderController);
OrderApiRoutes.post('/place-order', (req, res) => placeOrderController.handle(req, res));

export {OrderApiRoutes};
