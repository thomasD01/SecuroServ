import { Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './decorators';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService, private appService: AppService){}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Get('/oauth/authorize')
  async authorize() {
    return this.appService.getAuthorize();
  }
}
