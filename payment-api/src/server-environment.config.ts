import env from 'env-var';

const Environment = {
  SERVER_BASE_ROUTE: env.get('SERVER_BASE_ROUTE').required(true).asString(),
  SERVER_PORT: env.get('SERVER_PORT').default(3000).asInt(),
  MONGO_DATABASE_HOST: env.get('MONGO_DATABASE_HOST').required(true).asString(),
  MONGO_DATABASE_NAME: env.get('MONGO_DATABASE_NAME').required(true).asString(),
};

export {Environment};
