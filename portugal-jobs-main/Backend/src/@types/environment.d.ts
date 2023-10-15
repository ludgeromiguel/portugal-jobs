declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      DATABASE_URL: string;
      HOST: string;
      PORT: number;
      REDIS_IP: string;
      REDIS_PORT: number;
      REDIS_PASSWORD: string;
      JWT_SECRET: string;
      MAIL_HOST: string;
      MAIL_PORT: number;
      MAIL_USER: string;
      MAIL_PASS: string;
      MAIL_NOREPLY: string;
    }
  }
}

export { };
