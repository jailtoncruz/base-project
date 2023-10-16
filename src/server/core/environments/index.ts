export const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
export const CORS_DOMAINS: string[] = ['https://*.tomcruz.dev'];

if (process.env.NODE_ENV === 'development')
  CORS_DOMAINS.push('http://localhost:3000');
