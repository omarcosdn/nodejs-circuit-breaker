import {Request, Response} from 'express';

import {inject, injectable} from 'tsyringe';
import {PlaceOrderUseCase} from '@core/order/place-order.usecase';
import {Token} from '@src/dependency-injection.config';
import {Loggable} from '@shared/logging/loggable.interface';
import {BusinessError} from '@shared/exceptions/business.error';

@injectable()
export class PlaceOrderController {
  constructor(
    private readonly useCase: PlaceOrderUseCase,
    @inject(Token.LOGGABLE) private readonly logger: Loggable
  ) {}

  async handle(request: Request, response: Response) {
    const {amount} = request.body;

    try {
      const result = await this.useCase.execute({amount});
      if (result) {
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
    } catch (err: unknown) {
      this.logger.error('An error occurred during order placement process.', err);

      if (err instanceof BusinessError) {
        return response.status(400).json({
          error: err.message,
        });
      }

      return response.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
}
