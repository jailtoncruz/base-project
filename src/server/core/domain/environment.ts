export interface Environment {
  NODE_ENV: 'development' | 'production';
  JWT_SECRET: string;
  DATABASE_URL: string;
  SENDGRID_KEY: string;
}
