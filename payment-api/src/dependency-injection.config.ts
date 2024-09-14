import {container} from 'tsyringe';
import {IProcessPaymentUseCase, ProcessPaymentUseCase} from '@core/usecases/process-payment.usecase';
import {IPaymentRepository} from '@core/repositories/payment.repository';
import {PaymentRepositoryMongoAdapter} from '@infra/mongo/repositories/payment-mongodb.adapter';
import {InjectableToken} from '@src/dependency-injection.types';

container.register<IPaymentRepository>(InjectableToken.PAYMENT_REPOSITORY, {
  useClass: PaymentRepositoryMongoAdapter,
});

container.register<IProcessPaymentUseCase>(InjectableToken.PROCESS_PAYMENT_USE_CASE, {
  useClass: ProcessPaymentUseCase,
});
