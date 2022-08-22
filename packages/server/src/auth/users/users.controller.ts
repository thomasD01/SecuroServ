import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public } from '../../decorators';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService){}

  @Get('me')
  getProfile(@Request() req){
    return req.user
  }
}
