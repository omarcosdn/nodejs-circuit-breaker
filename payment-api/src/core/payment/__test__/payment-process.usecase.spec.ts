import {
    PaymentProcessInput,
    PaymentProcessOutput,
    PaymentProcessUseCase,
    PaymentStatus
} from '@core/payment/payment-process.usecase';
import { Loggable } from '@shared/logging/loggable.interface';
import { randomUUID } from 'crypto';

jest.mock('crypto', () => ({
    randomUUID: jest.fn()
}));

describe('PaymentProcessUseCase', () => {
    let useCase: PaymentProcessUseCase;
    let mockLogger: Loggable;

    beforeEach(() => {
        (randomUUID as jest.Mock).mockReturnValue('1234-uuid');

        mockLogger = {
            info: jest.fn(),
            error: jest.fn()
        };

        useCase = new PaymentProcessUseCase(mockLogger);
    });

    it('Should be able to process a payment', async () => {
        // Arrange
        const input: PaymentProcessInput = { amount: 10.59 };
        const expectedOutput: PaymentProcessOutput = {
            id: '1234-uuid',
            status: PaymentStatus.SUCCESS
        };

        // Act
        const result = await useCase.execute(input);

        // Assert
        expect(result).toEqual(expectedOutput);
        expect(mockLogger.info).toHaveBeenCalledWith('Starting payment process.');
        expect(mockLogger.info).toHaveBeenCalledWith('Payment of 10.59 processed successfully.');
    });
});