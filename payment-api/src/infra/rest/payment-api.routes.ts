import express from 'express';
import { HealthCheckController } from './controllers/health-check.controller';
import { PaymentProcessController } from './controllers/payment-process.controller';
import { container } from 'tsyringe';

const PaymentApiRoutes = express.Router();

// Health Check
const healthCheckController = container.resolve(HealthCheckController);
PaymentApiRoutes.get('/health', (req, res) => healthCheckController.handle(req, res));

// Payment Management
const paymentProcessController = container.resolve(PaymentProcessController);
PaymentApiRoutes.post('/payment-process', (req, res) => paymentProcessController.handle(req, res));

export { PaymentApiRoutes };