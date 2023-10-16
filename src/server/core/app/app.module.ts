import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from '../../application/models/models.module';
import { NextJSModule } from '../services/nextjs/nextjs.module';
import { PrismaModule } from '../services/prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from '../../application/modules/authentication/authentication.guard';
import { RolesGuard } from '../../application/modules/rbac/roles.guard';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
