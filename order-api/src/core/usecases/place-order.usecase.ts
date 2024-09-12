import {inject, injectable} from 'tsyringe';
import {randomUUID} from 'crypto';
import {ProcessPaymentGateway} from '@core/gateways/process-payment.gateway';
import {InjectableToken} from '@src/dependency-injection.types';
import {Logger} from '@shared/logging/logger.adapter';
import {ExecutableUseCase} from '@core/executable-usecase.interface';
import {Loggable} from '@shared/logging/loggable.interface';

export const OrderStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
} as const;

export interface PlaceOrderInput {
  amount: number;
}

export interface PlaceOrderOutput {
  id: string;
  status: string;
  amount: number;
  payment: Payment;
}

export interface Payment {
  id: string;
  status: string;
  amount: number;
}

export interface PlaceOrderUseCase extends ExecutableUseCase<PlaceOrderInput, PlaceOrderOutput | undefined> {}

@injectable()
export class DefaultPlaceOrderUseCase implements PlaceOrderUseCase {
  private readonly logger: Loggable = Logger.getInstance();

  constructor(@inject(InjectableToken.PAYMENT_API_GATEWAY) private readonly paymentGateway: ProcessPaymentGateway) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput | undefined> {
    this.logger.info('Starting order process.');

    const paymentOutput = await this.paymentGateway.execute({amount: input.amount});
    if (paymentOutput !== undefined) {
      const result: PlaceOrderOutput = {
        id: randomUUID(),
        status: OrderStatus.PENDING,
        amount: input.amount,
        payment: {
          id: paymentOutput.id,
          status: paymentOutput.status,
          amount: input.amount,
        },
      };

      this.logger.info('Order processed successfully.');

      return result;
    }

    this.logger.info('Finishing order process with error.');
  }
}
