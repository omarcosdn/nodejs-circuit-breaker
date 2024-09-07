import { container } from 'tsyringe';
import { HealthCheckController } from './infra/rest/controllers/health-check.controller';
import { PaymentProcessUseCase } from './core/payment/payment-process.usecase';
import { PaymentProcessController } from './infra/rest/controllers/payment-process.controller';

container.registerSingleton<HealthCheckController>(HealthCheckController);
container.registerSingleton<PaymentProcessUseCase>(PaymentProcessUseCase);
container.registerSingleton<PaymentProcessController>(PaymentProcessController);