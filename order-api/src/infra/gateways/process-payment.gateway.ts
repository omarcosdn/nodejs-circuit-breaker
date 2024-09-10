import CircuitBreaker from 'opossum';
import {
  ProcessPaymentGateway,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
} from '@core/gateways/process-payment.gateway';
import {BusinessError} from '@shared/exceptions/business.error';
import {injectable} from 'tsyringe';
import {getPaymentApiInstance} from '@infra/axios-instance.config';
import {createCircuitBreaker} from '@infra/circuit-breaker.config';

interface PaymentApiRequest {
  amount: number;
}

interface PaymentApiResponse {
  status: number;
  content: {
    id: string;
    status: string;
  };
}

@injectable()
export class DefaultProcessPaymentGateway implements ProcessPaymentGateway {
  private readonly breaker: CircuitBreaker<any, {data: PaymentApiResponse}>;

  constructor() {
    const requester = (data: PaymentApiRequest) => {
      return getPaymentApiInstance().post<PaymentApiResponse>('/payment-process', data);
    };

    this.breaker = createCircuitBreaker(requester);
  }

  async execute(input: ProcessPaymentRequest): Promise<ProcessPaymentResponse | undefined> {
    try {
      const {data} = await this.breaker.fire(input);

      return this.handleResponse(data);
    } catch (err: unknown) {
      throw new BusinessError('An unknown error occurred during payment processing');
    }
  }

  private handleResponse(data: PaymentApiResponse): ProcessPaymentResponse {
    if (data && data.status === 200) {
      return {
        id: data.content.id,
        status: data.content.status,
      } as ProcessPaymentResponse;
    }
    throw new BusinessError(`Unexpected status code: ${data?.status}`);
  }
}
