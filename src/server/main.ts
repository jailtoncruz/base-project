import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { startSwagger } from './core/services/swagger';
import { CORS_DOMAINS, SERVER_PORT } from './core/environments';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('MainBootstrap');
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors({ origin: CORS_DOMAINS });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') startSwagger(app);

  await app.listen(SERVER_PORT, async () => {
    logger.log(`Server started 🚀!`);
    logger.log(`on http://localhost:${SERVER_PORT}`);

    if (process.env.NODE_ENV === 'development')
      logger.log(
        `Swagger started on http://localhost:${SERVER_PORT}/api/swagger`,
      );
  });
}
bootstrap();
