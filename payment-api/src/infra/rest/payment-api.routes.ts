import express from 'express';
import { HealthCheckController } from "./controllers/health-check.controller";

const PaymentApiRoutes = express.Router();

PaymentApiRoutes.get('/health', (req, res) => new HealthCheckController().handle(req, res));

export { PaymentApiRoutes };