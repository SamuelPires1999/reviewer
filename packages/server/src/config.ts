import path from 'path';

import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const ENV = process.env;

export const config = {
  MONGO_URI: ENV.MONGO_URI || 'mongodb://localhost/27017',
  PORT: ENV.PORT || 3000,
  JWT_SECRET: ENV.JWT_KEY || 'secret_key',
  APPLICATION_COOKIE: 'woovi-challenge-cookie',
};
