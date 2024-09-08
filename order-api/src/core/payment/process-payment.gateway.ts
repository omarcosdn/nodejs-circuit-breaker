export interface ProcessPaymentRequest {
  amount: number;
}

export interface ProcessPaymentResponse {
  id: string;
  status: string;
}

export interface ProcessPaymentGateway {
  execute(input: ProcessPaymentRequest): Promise<ProcessPaymentResponse | undefined>;
}
