import {inject, injectable} from 'tsyringe';
import {ExecutableUseCase} from '@core/executable.interface';
import {Loggable} from '@shared/logging/loggable.interface';
import {IPaymentRepository} from '@core/repositories/payment.repository';
import {Payment} from '@core/entities/payment/payment.entity';
import {Logger} from '@shared/logging/logger.adapter';
import {InjectableToken} from '@src/dependency-injection.types';

export interface ProcessPaymentInput {
  amount: number;
}

export interface ProcessPaymentOutput {
  id: string;
  status: string;
}

export interface IProcessPaymentUseCase extends ExecutableUseCase<ProcessPaymentInput, ProcessPaymentOutput> {}

@injectable()
export class ProcessPaymentUseCase implements IProcessPaymentUseCase {
  private readonly logger: Loggable = Logger.getInstance();

  constructor(@inject(InjectableToken.PAYMENT_REPOSITORY) private readonly repository: IPaymentRepository) {}

  async execute(input: ProcessPaymentInput): Promise<ProcessPaymentOutput> {
    this.logger.info('Starting payment processing.');

    const payment: Payment = Payment.newPayment(input.amount);
    payment.markAsProcessed();

    await this.repository.save(payment);

    this.logger.info(`Payment processed successfully. PaymentId: ${payment.getIdentityAsString()}`);

    return {
      id: payment.getIdentityAsString(),
      status: payment.getStatus(),
    };
  }
}
