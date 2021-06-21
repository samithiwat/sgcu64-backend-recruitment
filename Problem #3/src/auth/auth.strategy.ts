import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(uid: string, password: string, res: Response): Promise<any> {
    const officer = await this.authService.validateUser(uid, password);
    if (!officer) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.createToken(officer);
    res.cookie('access_token', token, { httpOnly: true, secure: false });
    return token;
  }
}
