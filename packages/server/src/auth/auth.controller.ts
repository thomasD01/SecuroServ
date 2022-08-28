import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { Public } from '../decorators';
import { AppService } from '../app.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: {
    username: string | null,
    password: string | null,
  }){
    if(!body.username || !body.password){
      return ;
    }
    return this.authService.login(body.username, body.password);
  }

  @Public()
  @Post('/token')
  async getAccessToken(){
    //TODO implement endpoint to refresh auth token
  }
}
