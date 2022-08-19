import type { User } from '@prisma/client';

declare global{
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PWD: string;
      JWT_AUTH_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_SECRET: string;
      HASH_REFRESH_TOKEN_SECRET: string;
    }
  }
}

export type Payload = {
  id: number,
  name: string,
  prename: string,
  username: string,
  email: string
}