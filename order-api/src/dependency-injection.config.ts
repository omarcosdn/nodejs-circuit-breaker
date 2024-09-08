import {container} from 'tsyringe';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {Loggable} from '@shared/logging/loggable.interface';
import {Logger} from '@shared/logging/logger.adapter';
import {DefaultPaymentApiGateway} from '@infra/gateways/payment/payment-api.gateway';
import {PaymentApiGateway} from '@core/payment/payment-api.gateway';
import {PlaceOrderUseCase} from '@core/order/place-order.usecase';
import {PlaceOrderController} from '@infra/rest/controllers/place-order.controller';

export const Token = {
  LOGGABLE: 'Logger',
  PAYMENT_API_GATEWAY: 'PaymentApiGateway',
};

container.register<Loggable>(Token.LOGGABLE, {
  useClass: Logger,
});

container.register<PaymentApiGateway>(Token.PAYMENT_API_GATEWAY, {
  useClass: DefaultPaymentApiGateway,
});

container.registerSingleton<HealthCheckController>(HealthCheckController);
container.registerSingleton<PlaceOrderController>(PlaceOrderController);
container.registerSingleton<PlaceOrderUseCase>(PlaceOrderUseCase);
