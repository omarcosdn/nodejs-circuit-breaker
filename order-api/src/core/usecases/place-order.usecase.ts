import {inject, injectable} from 'tsyringe';
import {ProcessPaymentGateway} from '@core/gateways/process-payment.gateway';
import {InjectableToken} from '@src/dependency-injection.types';
import {Logger} from '@shared/logging/logger.adapter';
import {ExecutableUseCase} from '@core/executable-usecase.interface';
import {Loggable} from '@shared/logging/loggable.interface';
import {IOrderRepository} from '@core/repositories/order.repository';
import {Order} from '@core/entities/order/order.entity';
import {PaymentID} from '@core/entities/payment/payment.types';

export interface PlaceOrderInput {
  amount: number;
}

export interface PlaceOrderOutput {
  id: string;
}

export interface IPlaceOrderUseCase extends ExecutableUseCase<PlaceOrderInput, PlaceOrderOutput | undefined> {}

@injectable()
export class PlaceOrderUseCase implements IPlaceOrderUseCase {
  private readonly logger: Loggable = Logger.getInstance();

  constructor(
    @inject(InjectableToken.ORDER_REPOSITORY) private readonly repository: IOrderRepository,
    @inject(InjectableToken.PAYMENT_API_GATEWAY) private readonly paymentGateway: ProcessPaymentGateway
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput | undefined> {
    this.logger.info('Starting order process.');

    const order = Order.newOrder(input.amount);

    const paymentResponse = await this.paymentGateway.execute({amount: input.amount});
    if (paymentResponse !== undefined) {
      order.addPayment(new PaymentID(paymentResponse.id));
      order.markAsProcessed();

      await this.repository.save(order);

      this.logger.info('Order processed successfully.');

      return {
        id: order.getIdentityAsString(),
      };
    }

    this.logger.info('Finishing order process with error.');
  }
}
