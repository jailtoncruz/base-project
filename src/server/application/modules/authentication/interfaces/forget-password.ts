import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
