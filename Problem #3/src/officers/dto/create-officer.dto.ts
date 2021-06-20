import { ApiProperty } from '@nestjs/swagger';

export class CreateOfficerDto {
  @ApiProperty({ description: "This is an officer's id" })
  uid: string;

  @ApiProperty({ description: "This is an officer's password" })
  password: string;

  @ApiProperty({ description: "This is an officer's firstname" })
  firstName: string;

  @ApiProperty({ description: "This is an officer's lastname" })
  lastName: string;

  @ApiProperty({ description: "This is an officer's role" })
  role: string;

  @ApiProperty({ description: "This is an officer's salary" })
  salary: number;
}
