import { container } from 'tsyringe';
import { HealthCheckController } from './infra/rest/controllers/health-check.controller';
import { PaymentProcessUseCase } from './core/payment/payment-process.usecase';
import { PaymentProcessController } from './infra/rest/controllers/payment-process.controller';
import { Loggable } from './shared/logging/loggable.interface';
import { Logger } from './shared/logging/logger.adapter';

export const Token = {
    LOGGABLE: 'Logger'
}

container.register<Loggable>(Token.LOGGABLE, {
    useClass: Logger
});

container.registerSingleton<HealthCheckController>(HealthCheckController);
container.registerSingleton<PaymentProcessUseCase>(PaymentProcessUseCase);
container.registerSingleton<PaymentProcessController>(PaymentProcessController);