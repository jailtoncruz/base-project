import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInGoogle {
  @ApiProperty()
  @IsNotEmpty()
  access_token: string;
}
