import {Entity} from '@shared/core/default.entity';
import {OrderID, OrderProps, OrderStatus} from '@core/entities/order/order.types';
import {PaymentID} from '@core/entities/payment/payment.types';

export class Order extends Entity<OrderID> {
  private status: string;
  private amount: number;
  private readonly payments: PaymentID[];

  private constructor(props: OrderProps) {
    super(props.id);
    this.status = props.status;
    this.amount = props.amount;
    this.payments = props.payments;
  }

  public static newOrder(amount: number): Order {
    const props: OrderProps = {
      id: OrderID.newIdentity(),
      status: OrderStatus.PENDING,
      amount: amount,
      payments: [],
    };

    return new Order(props);
  }

  public markAsProcessed(): void {
    this.status = OrderStatus.PROCESSED;
  }

  public addPayment(paymentId: PaymentID): void {
    this.payments.push(paymentId);
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

  public getPaymentIds(): PaymentID[] {
    return this.payments;
  }
}
