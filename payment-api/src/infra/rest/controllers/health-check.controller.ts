import {Request, Response} from 'express';

export class HealthCheckController {
  async handle(request: Request, response: Response) {
    return response.json({
      status: 200,
      message: 'everything is fine',
    });
  }
}
