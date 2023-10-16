import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../core/services/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserResetPassword } from '@prisma/client';
import { randomUUID } from 'crypto';
import { uid } from '../../../core/services/id-generator';
import dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(user_id: string) {
    return this.prisma.user.findUnique({
      where: { id: user_id },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salts = 12;
    const salt = await bcrypt.genSalt(salts);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async createResetPasswordToken(user_id: string): Promise<UserResetPassword> {
    return await this.prisma.userResetPassword.create({
      data: {
        id: uid(),
        user_id,
        token: randomUUID(),
        expires_at: dayjs(new Date()).add(3, 'day').toDate(),
      },
    });
  }

  async changePassword({
    user_id,
    old_password,
    new_password,
  }: ChangePasswordParams) {
    const user = await this.findOne(user_id);

    if (await this.comparePassword(old_password, user.password))
      await this.resetPassword(user_id, new_password);
    else throw new UnauthorizedException();
  }

  async getResetPasswordByToken(
    token: string,
  ): Promise<UserResetPassword | undefined> {
    const reset = await this.prisma.userResetPassword.findUnique({
      where: {
        token,
      },
    });

    return reset;
  }

  async resetPassword(userId: string, newPassword: string) {
    await this.prisma.user.update({
      data: {
        password: await this.hashPassword(newPassword),
      },
      where: {
        id: userId,
      },
    });
  }
}

interface ChangePasswordParams {
  user_id: string;
  old_password: string;
  new_password: string;
}
