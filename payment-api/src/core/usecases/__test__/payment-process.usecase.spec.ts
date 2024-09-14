import 'reflect-metadata';
import {
  IProcessPaymentUseCase,
  ProcessPaymentInput,
  ProcessPaymentOutput,
  ProcessPaymentUseCase,
} from '@core/usecases/process-payment.usecase';
import {randomUUID} from 'crypto';
import {PaymentStatus} from '@core/entities/payment/payment.types';
import {IPaymentRepository} from '@core/repositories/payment.repository';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('PaymentProcessUseCase', () => {
  let useCase: IProcessPaymentUseCase;
  let repository: IPaymentRepository;

  beforeEach(() => {
    (randomUUID as jest.Mock).mockReturnValue('1234-uuid');

    repository = {
      save: jest.fn(),
    };

    useCase = new ProcessPaymentUseCase(repository);
  });

  it('Should be able to process a payment', async () => {
    // Arrange
    const input: ProcessPaymentInput = {amount: 10.59};
    const expectedOutput: ProcessPaymentOutput = {
      id: '1234-uuid',
      status: PaymentStatus.PROCESSED,
    };

    // Act
    const result = await useCase.execute(input);

    // Assert
    expect(result).toEqual(expectedOutput);
    expect(repository.save).toHaveBeenCalled();
  });
});
