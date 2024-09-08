import env from 'env-var';

const Env = {
  SERVER_PORT: env.get('SERVER_PORT').default(3000).asInt(),
  PAYMENT_API_ROUTE: env.get('PAYMENT_API_ROUTE').required(true).asString(),
};

export {Env};
