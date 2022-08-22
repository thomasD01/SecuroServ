import { Injectable } from '@nestjs/common';
import { createHmac } from 'crypto'
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto'

import { UsersService } from './users/users.service';
import type { Payload } from '../../enviroment';
import { createRequest, getRefreshToken, getRequest } from '../db/database';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === hashPass(password, username)) {
      let result: Payload = {
        id: user.id,
        name: user.name,
        prename: user.prename,
        username: user.username,
        email: user.email
      }
      return result;
    }
    return null;
  }

  /*************************************************************************************************
   * Login/Logout                                                                                  *
   *************************************************************************************************/
  async login(payload: Payload): Promise<{ code: string }> {
    try {
      let code: string | null = null;
      while (code === null) {
        let tmp = randomBytes(32).toString('base64');
        console.log(tmp);
        let response = await getRequest(tmp);
        if (response === null) {
          code = tmp;
        }
      }
      const request = await createRequest(
        code,
        this.generateAuthToken(payload),
        this.generateRefreshToken(payload)
      )
      return { code: request.code }
    }
    catch (error) {
      console.error(error);
      return { code:'' }
    }
  }
  async logout(payload: Payload): Promise<boolean> {
    try {
      await this.usersService.deleteToken(payload.id);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  /*************************************************************************************************
   * Token Functions                                                                               *
   *************************************************************************************************/
  generateAuthToken(payload: Payload) {
    let token = this.jwtService.sign(payload, {
      secret: process.env.JWT_AUTH_TOKEN_SECRET,
      expiresIn: '5m'
    })
    return token;
  }
  generateRefreshToken(payload: Payload): string {
    let content = { content: Date.now() + payload.email };
    let token = this.jwtService.sign(content, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d'
    })
    return token;
  }
  async refreshAuthToken(payload: Payload, refreshToken: string): Promise<{ auth_token: string } | null> {
    const hashedToken = this.hashToken(refreshToken);
    const validHashedToken = await getRefreshToken(payload.id);

    if (hashedToken !== validHashedToken) {
      return null;
    }

    return {
      auth_token: this.generateAuthToken(payload)
    };
  }

  /*************************************************************************************************
   * Hashing Functions                                                                             *
   *************************************************************************************************/
  hashToken(token: string): string {
    let hash = createHmac('sha256', process.env.HASH_REFRESH_TOKEN_SECRET)
      .update(token)
      .digest('base64');
    return hash;
  }
}
export function hashPass(plain: string, secret: string): string {
  let hash = createHmac('sha256', secret)
    .update(plain)
    .digest('base64');
  return hash;
}
