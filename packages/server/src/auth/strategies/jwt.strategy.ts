import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import type { Payload } from '../../enviroment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_TOKEN_SECRET,
    }
    super(options);
  }

  async validate(payload: any): Promise<Payload> {
    return {
      id: payload.id,
      name: payload.name,
      prename: payload.prename,
      email: payload.email,
      username: payload.username
    };
  }
}