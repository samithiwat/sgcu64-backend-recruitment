/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

const cookieExtracter = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'].access_token;
  }
  return token;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtracter]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return {
      uid: payload.uid,
      firstname: payload.firstname,
      lastname: payload.lastname,
      role: payload.role,
      salary: payload.salary,
    };
  }
}
