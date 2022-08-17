import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public } from '../../decorators';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('profile')
  getProfile(@Request() req){
    return req.user
  }
}
