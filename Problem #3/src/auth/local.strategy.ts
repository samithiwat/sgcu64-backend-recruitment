import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(uid: string, password: string): Promise<any> {
    const officer = this.authService.validateUser(uid, password);
    console.log('Local Strategy Validated!');
    console.log(officer);
    if (!officer) {
      throw new UnauthorizedException();
    }
    return officer;
  }
}
