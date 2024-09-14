import {Entity} from '@shared/core/default.entity';
import {PaymentID, PaymentProps, PaymentStatus} from '@core/entities/payment/payment.types';

export class Payment extends Entity<PaymentID> {
  private status: string;
  private amount: number;

  private constructor(props: PaymentProps) {
    super(props.id);
    this.status = props.status;
    this.amount = props.amount;
  }

  public static newPayment(amount: number): Payment {
    const props: PaymentProps = {
      id: PaymentID.newIdentity(),
      status: PaymentStatus.PENDING,
      amount: amount,
    };

    return new Payment(props);
  }

  public markAsProcessed(): void {
    this.status = PaymentStatus.PROCESSED;
  }

  public getStatus(): string {
    return this.status;
  }

  public getAmount(): number {
    return parseFloat(this.amount.toFixed(2));
  }

  public getIdentityAsString(): string {
    return this.getIdentity().asString();
  }
}
