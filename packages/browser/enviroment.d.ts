
declare global{
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_URL: string;
      AUTH_CLIENT_ID: string;
      AUTH_SECRET: string;
    }
  }
}

export {} 