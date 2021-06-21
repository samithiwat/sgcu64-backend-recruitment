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
    if (officer && officer.password === password) {
      const { password, ...result } = officer;
      return result;
    }
    return null;
  }

  async createToken(officer: any) {
    const payload = {
      uid: officer.uid,
      firstname: officer.firstName,
      lastname: officer.lastName,
      role: officer.role,
      salary: officer.salary,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
