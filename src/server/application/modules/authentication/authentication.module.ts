import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SendgridService } from '../../../core/services/sendgrid/sendgrid.service';
import { UserService } from '../../models/user/user.service';

@Module({
  providers: [AuthenticationService, UserService, SendgridService, Logger],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7 day' },
    }),
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
