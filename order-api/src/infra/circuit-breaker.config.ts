import CircuitBreaker from 'opossum';
import {Environment} from '@src/server-environment.config';

export const defaultCircuitBreaker = <Request, Response>(requester: (data: Request) => Promise<Response>) => {
  return new CircuitBreaker(requester, {
    name: 'DefaultApiCircuitBreaker',
    timeout: Environment.CIRCUIT_BREAKER_TIMEOUT,
    errorThresholdPercentage: Environment.CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE,
    resetTimeout: Environment.CIRCUIT_BREAKER_RESET_TIMEOUT,
  });
};
