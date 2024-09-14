import {injectable} from 'tsyringe';
import {IPaymentRepository} from '@core/repositories/payment.repository';
import {PaymentDocument} from '@infra/mongo/schemas/payment.schema';
import {Payment} from '@core/entities/payment/payment.entity';

@injectable()
export class PaymentRepositoryMongoAdapter implements IPaymentRepository {
  async save(entity: Payment): Promise<void> {
    const document = new PaymentDocument({
      _id: entity.getIdentityAsString(),
      status: entity.getStatus(),
      amount: entity.getAmount(),
    });

    await document.save();
  }
}
