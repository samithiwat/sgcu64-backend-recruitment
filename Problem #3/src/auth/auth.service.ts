import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OfficersService } from 'src/officers/officers.service';

@Injectable()
export class AuthService {
  constructor(
    private officerService: OfficersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(uid: string, password: string): Promise<any> {
    const officer = await this.officerService.getId(uid);
    console.log(officer);
    if (officer && officer.password === password) {
      const { password, ...result } = officer;
      return result;
    }
    return null;
  }

  async login(officer: any) {
    const payload = {
      uid: officer.uid,
      firstname: officer.firstname,
      lastname: officer.lastname,
      role: officer.role,
      salary: officer.salary,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
