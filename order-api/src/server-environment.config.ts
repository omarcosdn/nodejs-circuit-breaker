import env from 'env-var';

const Environment = {
  SERVER_PORT: env.get('SERVER_PORT').default(3000).asInt(),
  PAYMENT_API_ROUTE: env.get('PAYMENT_API_ROUTE').required(true).asString(),
  PAYMENT_API_RETRIES: env.get('PAYMENT_API_RETRIES').required(true).asInt(),
  PAYMENT_API_TIMEOUT: env.get('PAYMENT_API_TIMEOUT').required(true).asInt(),
  CIRCUIT_BREAKER_TIMEOUT: env.get('CIRCUIT_BREAKER_TIMEOUT').required(true).asInt(),
  CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE: env.get('CIRCUIT_BREAKER_ERROR_THRESHOLD_PERCENTAGE').required(true).asInt(),
  CIRCUIT_BREAKER_RESET_TIMEOUT: env.get('CIRCUIT_BREAKER_RESET_TIMEOUT').required(true).asInt(),
};

export {Environment};
