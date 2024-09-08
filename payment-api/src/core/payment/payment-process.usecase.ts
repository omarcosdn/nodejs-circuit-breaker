import 'reflect-metadata';
import {Executable} from '@core/executable.interface';
import {randomUUID} from 'crypto';
import {inject, injectable} from 'tsyringe';
import {Loggable} from '@shared/logging/loggable.interface';
import {Token} from '@src/dependency-injection.config';

export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
} as const;

export interface PaymentProcessInput {
  amount: number;
}

export interface PaymentProcessOutput {
  id: string;
  status: string;
}

@injectable()
export class PaymentProcessUseCase implements Executable<PaymentProcessInput, PaymentProcessOutput> {
  constructor(@inject(Token.LOGGABLE) private readonly logger: Loggable) {}

  async execute(input: PaymentProcessInput): Promise<PaymentProcessOutput> {
    this.logger.info('Starting payment process.');

    const result: PaymentProcessOutput = {
      id: randomUUID(),
      status: PaymentStatus.SUCCESS,
    };

    this.logger.info(`Payment of ${input.amount} processed successfully.`);

    return result;
  }
}
