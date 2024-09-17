import {Order} from '@core/entities/order/order.entity';

export interface IOrderRepository {
  save(entity: Order): Promise<void>;
}
