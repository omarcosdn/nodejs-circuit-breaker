import {injectable} from 'tsyringe';
import {Order} from '@core/entities/order/order.entity';
import {OrderDocument} from '@infra/mongo/schemas/order.schema';
import {IOrderRepository} from '@core/repositories/order.repository';

@injectable()
export class OrderRepositoryMongoAdapter implements IOrderRepository {
  async save(entity: Order): Promise<void> {
    const paymentIds = entity.getPaymentIds().map((value) => {
      return {
        _id: value.asString(),
      };
    });

    const document = new OrderDocument({
      _id: entity.getIdentityAsString(),
      status: entity.getStatus(),
      amount: entity.getAmount(),
      payments: paymentIds,
    });

    await document.save();
  }
}
