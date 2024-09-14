import {Request, Response} from 'express';
import {IProcessPaymentUseCase} from '@core/usecases/process-payment-use.case';
import {inject, injectable} from 'tsyringe';
import {InjectableToken} from '@src/dependency-injection.types';

@injectable()
export class PaymentProcessController {
  constructor(@inject(InjectableToken.PROCESS_PAYMENT_USE_CASE) private readonly useCase: IProcessPaymentUseCase) {}

  async handle(request: Request, response: Response) {
    const {amount} = request.body;

    const result = await this.useCase.execute({amount});

    return response.json({
      status: 200,
      content: {
        id: result.id,
        status: result.status,
      },
    });
  }
}
