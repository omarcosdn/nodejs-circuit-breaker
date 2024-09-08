import {inject, injectable} from 'tsyringe';
import {randomUUID} from 'crypto';
import {Token} from '@src/dependency-injection.config';
import {Loggable} from '@shared/logging/loggable.interface';
import {Executable} from '@core/executable.interface';
import {ProcessPaymentGateway} from '@core/payment/process-payment.gateway';

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

@injectable()
export class PlaceOrderUseCase implements Executable<PlaceOrderInput, PlaceOrderOutput | undefined> {
  constructor(
    @inject(Token.LOGGABLE) private readonly logger: Loggable,
    @inject(Token.PAYMENT_API_GATEWAY) private readonly paymentGateway: ProcessPaymentGateway
  ) {}

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
