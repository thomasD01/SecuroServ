
declare global{
  namespace NodeJS {
    interface ProcessEnv {
      HOSTNAME: string;
      PORT: string;
    }
  }
}