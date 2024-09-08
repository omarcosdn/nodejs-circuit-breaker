import {PaymentApiGateway, PaymentInput, PaymentOutput} from '@core/payment/payment-api.gateway';
import {injectable} from 'tsyringe';
import {randomUUID} from 'crypto';

@injectable()
export class DefaultPaymentApiGateway implements PaymentApiGateway {
  async execute(input: PaymentInput): Promise<PaymentOutput> {
    return {
      id: randomUUID(),
      status: 'PENDING',
    } as PaymentOutput;
  }
}
