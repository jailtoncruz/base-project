import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendgridService } from '../../../core/services/sendgrid/sendgrid.service';
import { buildAppURL } from '../../../core/services/utils/build-app-url';
import { UserService } from '../../models/user/user.service';
import { createPayload } from './usecases/create-payload';

@Injectable()
export class AuthenticationService {
  private readonly logger: Logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sendgridService: SendgridService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    if (!(await this.userService.comparePassword(password, user.password)))
      throw new UnauthorizedException();

    const payload = createPayload(user);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async forgetPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const reset = await this.userService.createResetPasswordToken(user.id);
      const reset_password_url = buildAppURL(
        '/auth/reset-password?token=',
        reset.token,
      );
      await this.sendgridService.send({
        from: 'support@tomcruz.dev',
        to: user.email,
        templateId: 'd-73d9089f59874706a96ef7ca77b94060',
        dynamicTemplateData: {
          reset_password_url,
        },
      });
    } else {
      this.logger.log(
        `Request to reset password of user email [${email}] but, user not found.`,
      );
    }
  }

  async refreshToken(user_id: string) {
    const user = await this.userService.findOne(user_id);

    const payload = createPayload(user);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkResetPasswordToken(token: string) {
    const reset = await this.userService.getResetPasswordByToken(token);
    if (!reset) throw new ForbiddenException();
  }

  async resetPasswordWithToken(token: string, password: string) {
    const reset = await this.userService.getResetPasswordByToken(token);
    if (!reset || reset.expires_at < new Date(Date.now()))
      throw new ForbiddenException();

    await this.userService.resetPassword(reset.user_id, password);
  }
}
