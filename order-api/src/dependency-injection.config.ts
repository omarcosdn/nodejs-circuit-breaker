import {container} from 'tsyringe';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {DefaultProcessPaymentGateway} from '@infra/gateways/process-payment.gateway';
import {DefaultPlaceOrderUseCase} from '@core/usecases/place-order.usecase';
import {DefaultPlaceOrderController} from '@infra/rest/controllers/place-order.controller';
import {InjectableToken} from '@src/dependency-injection.types';

container.registerSingleton(InjectableToken.PAYMENT_API_GATEWAY, DefaultProcessPaymentGateway);
container.registerSingleton(InjectableToken.PLACE_ORDER_USE_CASE, DefaultPlaceOrderUseCase);
container.registerSingleton(InjectableToken.PLACE_ORDER_CONTROLLER, DefaultPlaceOrderController);
container.registerSingleton<HealthCheckController>(HealthCheckController);
