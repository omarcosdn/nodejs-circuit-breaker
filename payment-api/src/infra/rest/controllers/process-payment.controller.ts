import {Request, Response} from 'express';
import {inject, injectable} from 'tsyringe';
import {IProcessPaymentUseCase} from '@core/usecases/process-payment.usecase';
import {InjectableToken} from '@src/dependency-injection.types';
import {IController} from '@infra/rest/controllable.interface';
import {processPaymentSchema} from '@infra/rest/controllers/process-payment.schema';
import {z} from 'zod';

@injectable()
export class ProcessPaymentController implements IController {
  constructor(@inject(InjectableToken.PROCESS_PAYMENT_USE_CASE) private readonly useCase: IProcessPaymentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      if(!request.body || Object.keys(request.body).length === 0) {
        return response.status(400).json({
          status: 400,
          message: 'Invalid payment request body',
        });
      }

      const {amount} = processPaymentSchema.parse(request.body);

      const result = await this.useCase.execute({amount});

      return response.json({
        status: 200,
        content: {
          id: result.id,
          status: result.status,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({
          status: 400,
          error: error.errors,
        });
      }

      return response.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
