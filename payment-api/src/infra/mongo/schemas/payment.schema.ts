import {model, Schema} from 'mongoose';

interface IPaymentDocument extends Document {
  paymentId: string;
  status: string;
  amount: number;
}

const PaymentSchema: Schema = new Schema({
  _id: {type: String, required: true},
  status: {type: String, required: true},
  amount: {type: Number, required: true},
});

export const PaymentDocument = model<IPaymentDocument>('Payment', PaymentSchema, 'payments');
