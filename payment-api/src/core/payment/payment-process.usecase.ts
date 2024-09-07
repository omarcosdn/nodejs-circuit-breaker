import { Executable } from '../executable.interface';
import { randomUUID } from 'crypto';
import { Logger } from '../../shared/logging/logger.adapter';
import { injectable } from 'tsyringe';

export const PaymentStatus = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS'
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
    async execute(input: PaymentProcessInput): Promise<PaymentProcessOutput> {
        Logger.info('Starting payment process.');

        const result: PaymentProcessOutput = {
            id: randomUUID(),
            status: PaymentStatus.SUCCESS
        };

        Logger.info(`Payment of ${ input.amount } processed successfully.`);

        return result;
    }
}