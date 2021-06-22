import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'User Id' })
  uid: string;

  @ApiProperty({ description: "User's password" })
  password: string;
}
