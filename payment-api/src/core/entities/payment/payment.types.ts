import {Uuid} from '@shared/core/uuid.vo';

export class PaymentID extends Uuid {}

export const PaymentStatus = {
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
} as const;

export type PaymentProps = {
  id: PaymentID;
  status: string;
  amount: number;
};
