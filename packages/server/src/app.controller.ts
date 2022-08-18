import { Controller, Get, Post, Query, Request, Res, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators';
import { AppService } from './app.service';
import { prismaClient } from './db/database';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService){}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }

  @Public()
  @Get('/oauth/authorize')
  async getAuthorize(
    @Query('client_id') client_id: string,
    @Query('redirect_uri') redirect_uri: string,
    @Query('state') state: string,
    @Query('scope') scope: string,
    @Query('response_type') response_type: string,
    @Res() response: Response
  ){
    const authorizedClient = await prismaClient.authorized_Clients.findUnique({
      where: { client_id: client_id }
    });
    if(!authorizedClient){
      return response.status(401).end();
    }
    return this.appService.getAuthorize();
  }
}
