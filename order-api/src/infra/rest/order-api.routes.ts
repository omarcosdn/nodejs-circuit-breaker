import express from 'express';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {container} from 'tsyringe';

const OrderApiRoutes = express.Router();

// Health Check
const healthCheckController = container.resolve(HealthCheckController);
OrderApiRoutes.get('/health', (req, res) => healthCheckController.handle(req, res));

export {OrderApiRoutes};
