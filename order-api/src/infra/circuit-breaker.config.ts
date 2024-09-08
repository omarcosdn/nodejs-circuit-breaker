import CircuitBreaker from 'opossum';

export const createCircuitBreaker = <Request, Response>(requester: (data: Request) => Promise<Response>) => {
  return new CircuitBreaker(requester, {
    name: 'PaymentApiCircuitBreaker',
    timeout: 5000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  });
};
