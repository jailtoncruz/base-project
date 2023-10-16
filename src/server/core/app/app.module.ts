import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from '../../application/models/models.module';
import { NextJSModule } from '../services/nextjs/nextjs.module';
import { PrismaModule } from '../services/prisma/prisma.module';

@Module({
  imports: [
    NextJSModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ModelsModule,
    PrismaModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
