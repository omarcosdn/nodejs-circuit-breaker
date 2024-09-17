import {Request, Response} from 'express';
import {IController} from '@infra/rest/controllable.interface';

export class HealthCheckController implements IController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.json({
      status: 200,
      message: 'everything is fine',
    });
  }
}
