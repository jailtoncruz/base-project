import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from '../../common/decorators/public';
import { AuthenticationService } from './authentication.service';
import { SignInDTO } from './interfaces/signin-dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgetPasswordDTO } from './interfaces/forget-password';
import { ResetPasswordWithTokenDTO } from './interfaces/reset-password-dto';
import { AuthRequest } from '../../../core/domain/auth-request';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @Post('refresh-token')
  refreshToken(@Request() req: AuthRequest) {
    const { sub } = req.user;
    return this.authService.refreshToken(sub);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forget')
  forgetPassword(@Body() forget: ForgetPasswordDTO) {
    return this.authService.forgetPassword(forget.email);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('reset-password/:token')
  checkResetPaswordToken(@Param('token') token: string) {
    return this.authService.checkResetPasswordToken(token);
  }

  @Public()
  @Post('reset-password/:token')
  resetPasswordWithToken(
    @Param('token') token: string,
    @Body() { password }: ResetPasswordWithTokenDTO,
  ) {
    if (!token) throw new ForbiddenException();

    return this.authService.resetPasswordWithToken(token, password);
  }
}
