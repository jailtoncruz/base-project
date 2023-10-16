import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function startSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Base project - Swagger')
    .setDescription(
      'Change the swagger information on src/server/core/services/swagger',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
}
