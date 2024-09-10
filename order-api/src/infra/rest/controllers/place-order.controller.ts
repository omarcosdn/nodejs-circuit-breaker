import {inject, injectable} from 'tsyringe';
import {Request, Response} from 'express';
import {PlaceOrderUseCase} from '@core/usecases/place-order.usecase';
import {BusinessError} from '@shared/exceptions/business.error';
import {InjectableToken} from '@src/dependency-injection.types';
import {Logger} from '@shared/logging/logger.adapter';

export interface PlaceOrderController {
  handle(request: Request, response: Response): Promise<any>;
}

@injectable()
export class DefaultPlaceOrderController implements PlaceOrderController {
  constructor(
    @inject(InjectableToken.PLACE_ORDER_USE_CASE) private readonly useCase: PlaceOrderUseCase,
    @inject(InjectableToken.LOGGABLE) private readonly logger: Logger
  ) {}

  async handle(request: Request, response: Response) {
    const {amount} = request.body;

    try {
      const result = await this.useCase.execute({amount});
      if (result) {
        return response.json({
          status: 200,
          content: result,
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
