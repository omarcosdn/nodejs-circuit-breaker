export interface PaymentInput {
  amount: number;
}

export interface PaymentOutput {
  id: string;
  status: string;
}

export interface PaymentApiGateway {
  execute(input: PaymentInput): Promise<PaymentOutput>;
}
