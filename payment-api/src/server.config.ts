import env from 'env-var';

const Env = {
  SERVER_PORT: env.get('SERVER_PORT').default(3000).asInt(),
};

export {Env};
