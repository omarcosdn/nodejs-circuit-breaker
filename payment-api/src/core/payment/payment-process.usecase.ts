import { Executable } from '../executable.interface';
import { randomUUID } from 'crypto';
import { Logger } from '../../shared/logging/logger.adapter';
import { injectable } from 'tsyringe';

export interface PaymentProcessInput {
    orderId: string;
    paymentValue: number;
}

export interface PaymentProcessOutput {
    transactionId: string;
    orderId: string;
    paymentValue: number;
}

@injectable()
export class PaymentProcessUseCase implements Executable<PaymentProcessInput, PaymentProcessOutput> {
    async execute(input: PaymentProcessInput): Promise<PaymentProcessOutput> {
        Logger.info('Starting payment process.');

        const transactionId = randomUUID();

        const result = {
            transactionId: transactionId,
            orderId: input.orderId,
            paymentValue: input.paymentValue
        };

        Logger.info(`Payment processed successfully. ${ JSON.stringify(result) }`);

        return result;
    }
}