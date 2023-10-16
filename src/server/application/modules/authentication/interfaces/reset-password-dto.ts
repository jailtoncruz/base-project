import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordWithTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
