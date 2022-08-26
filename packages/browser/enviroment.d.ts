
declare global{
  namespace NodeJS {
    interface ProcessEnv {
      OAUTH_URL: string;
      OAUTH_CLIENT_ID: string;
      OAUTH_SECRET: string;
    }
  }
  const isDev: boolean = process.env.NODE_ENV !== 'production';
}

export {} 