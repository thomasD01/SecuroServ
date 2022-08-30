import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Public } from '../decorators';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() request){
    return this.authService.login(request.user);
  }

  @Public()
  @Post('/token')
  async getAccessToken(){
    //TODO implement endpoint to refresh auth token
  }
}
