import {Request, Response} from 'express';
import {IProcessPaymentUseCase} from '@core/usecases/process-payment-use.case';
import {inject, injectable} from 'tsyringe';
import {InjectableToken} from '@src/dependency-injection.types';
import {IController} from '@infra/rest/controllable.interface';

@injectable()
export class PaymentProcessController implements IController {
  constructor(@inject(InjectableToken.PROCESS_PAYMENT_USE_CASE) private readonly useCase: IProcessPaymentUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
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
