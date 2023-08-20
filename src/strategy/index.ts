import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-cat',
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
