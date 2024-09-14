import {Payment} from '@core/entities/payment/payment.entity';

export interface IPaymentRepository {
  save(entity: Payment): Promise<void>;
}
