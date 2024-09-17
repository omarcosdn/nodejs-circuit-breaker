import {Uuid} from '@shared/core/uuid.vo';
import {PaymentID} from '@core/entities/payment/payment.types';

export class OrderID extends Uuid {}

export const OrderStatus = {
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
} as const;

export type OrderProps = {
  id: OrderID;
  status: string;
  amount: number;
  payments: PaymentID[];
};
