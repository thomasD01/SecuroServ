
declare global{
  namespace NodeJS {
    interface ProcessEnv {
      OAUTH_URL: string
    }
  }
}