import {container} from 'tsyringe';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {Loggable} from '@shared/logging/loggable.interface';
import {Logger} from '@shared/logging/logger.adapter';
import {DefaultPaymentProcessorApiGateway} from '@infra/gateways/payment/process-payment.gateway';
import {ProcessPaymentGateway} from '@core/payment/process-payment.gateway';
import {PlaceOrderUseCase} from '@core/order/place-order.usecase';
import {PlaceOrderController} from '@infra/rest/controllers/place-order.controller';

export const Token = {
  LOGGABLE: 'Logger',
  PAYMENT_API_GATEWAY: 'PaymentApiGateway',
};

container.register<Loggable>(Token.LOGGABLE, {
  useClass: Logger,
});

container.register<ProcessPaymentGateway>(Token.PAYMENT_API_GATEWAY, {
  useClass: DefaultPaymentProcessorApiGateway,
});

container.registerSingleton<HealthCheckController>(HealthCheckController);
container.registerSingleton<PlaceOrderUseCase>(PlaceOrderUseCase);
container.registerSingleton<PlaceOrderController>(PlaceOrderController);
