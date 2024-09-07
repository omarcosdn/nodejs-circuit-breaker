import { Request, Response } from 'express';
import { PaymentProcessUseCase } from '../../../core/payment/payment-process.usecase';
import { injectable } from 'tsyringe';

@injectable()
export class PaymentProcessController {
    constructor(private readonly useCase: PaymentProcessUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { order_id: orderId, payment_value: paymentValue } = request.body;

        const result = await this.useCase.execute({
            orderId: orderId,
            paymentValue: paymentValue
        });

        return response.json({
            status: 200,
            content: {
                transaction_id: result.transactionId
            }
        });
    }
}