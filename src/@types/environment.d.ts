declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENDGRID_API_KEY: string;
      MAILADRESS: string;
      DASHGO_URL: string;
      PORT: number;
    }
  }
}

export {};
