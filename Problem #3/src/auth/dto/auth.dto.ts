import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  password: string;
}
