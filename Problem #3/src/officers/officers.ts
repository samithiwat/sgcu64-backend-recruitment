import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';

export class Officer {
  uid: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  salary: number;

  constructor(attrs: Officer) {
    Object.assign(this, attrs);
  }
}

export class OfficerInfo {
  @ApiProperty({ description: `An officer's User ID` })
  uid: string;

  @ApiProperty({ description: `An officer's firstname` })
  firstName: string;

  @ApiProperty({ description: `An officer's lastname` })
  lastName: string;

  @ApiProperty({ description: `An officer's role`, enum: Role })
  role: string;

  @ApiProperty({ description: "An officer's salary", minimum: 0 })
  salary: number;
}
