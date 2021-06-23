import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';

export class CreateOfficerDto {
  @ApiProperty({ description: "An officer's id" })
  uid: string;

  @ApiProperty({ description: "An officer's password" })
  password: string;

  @ApiProperty({ description: "An officer's firstname" })
  firstName: string;

  @ApiProperty({ description: "An officer's lastname" })
  lastName: string;

  @ApiProperty({ description: `An officer's role`, enum: Role })
  role: string;

  @ApiProperty({ description: "An officer's salary", minimum: 0 })
  salary: number;
}
