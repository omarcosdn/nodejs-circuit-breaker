import {model, Schema} from 'mongoose';

interface IOrderDocument extends Document {
  orderId: string;
  status: string;
  amount: number;
  payments: [
    {
      paymentId: string;
    },
  ];
}

const OrderSchema: Schema = new Schema({
  _id: {type: String, required: true},
  status: {type: String, required: true},
  amount: {type: Number, required: true},
  payments: [
    {
      _id: {type: String, required: true},
    },
  ],
});

export const OrderDocument = model<IOrderDocument>('Order', OrderSchema, 'orders');
