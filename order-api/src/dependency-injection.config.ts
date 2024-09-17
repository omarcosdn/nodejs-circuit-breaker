import {container} from 'tsyringe';
import {HealthCheckController} from '@infra/rest/controllers/health-check.controller';
import {DefaultProcessPaymentGateway} from '@infra/gateways/process-payment.gateway';
import {PlaceOrderUseCase} from '@core/usecases/place-order.usecase';
import {PlaceOrderController} from '@infra/rest/controllers/place-order.controller';
import {InjectableToken} from '@src/dependency-injection.types';
import {OrderRepositoryMongoAdapter} from '@infra/mongo/repositories/order-mongodb.adapter';

container.registerSingleton(InjectableToken.PAYMENT_API_GATEWAY, DefaultProcessPaymentGateway);
container.registerSingleton(InjectableToken.ORDER_REPOSITORY, OrderRepositoryMongoAdapter);
container.registerSingleton(InjectableToken.PLACE_ORDER_USE_CASE, PlaceOrderUseCase);
container.registerSingleton(InjectableToken.PLACE_ORDER_CONTROLLER, PlaceOrderController);
container.registerSingleton<HealthCheckController>(HealthCheckController);
