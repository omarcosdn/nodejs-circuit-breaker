import { Request, Response } from 'express';
import { PaymentProcessUseCase } from '@core/payment/payment-process.usecase';
import { injectable } from 'tsyringe';

@injectable()
export class PaymentProcessController {
    constructor(private readonly useCase: PaymentProcessUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { amount } = request.body;

        const result = await this.useCase.execute({ amount });

        return response.json({
            status: 200,
            content: {
                id: result.id,
                status: result.status
            }
        });
    }
}