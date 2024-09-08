import {Request, Response} from 'express';

import {injectable} from 'tsyringe';
import {PlaceOrderUseCase} from '@core/order/place-order.usecase';

@injectable()
export class PlaceOrderController {
  constructor(private readonly useCase: PlaceOrderUseCase) {}

  async handle(request: Request, response: Response) {
    const {amount} = request.body;

    const result = await this.useCase.execute({amount});

    return response.json({
      status: 200,
      content: {
        id: result.id,
        status: result.status,
        amount: result.amount,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          amount: result.payment.amount,
        },
      },
    });
  }
}
