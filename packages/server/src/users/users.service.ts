import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { prismaClient } from '../db/database';

@Injectable()
export class UsersService {

  async findOne(username: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { username: username } });
    return user;
  }

  async changeUsername(userid: number, username: string): Promise<boolean> {
    let res = await prismaClient.user.update({
      where:{
        id: userid
      },
      data:{
        username: username
      }
    })
    return res !== undefined;
  }
  async updateToken(userid:number, token: string){
    prismaClient.user.update({
      where: {
        id: userid
      },
      data: {
        RefreshToken: token
      }
    })
  }
  async deleteToken(userid:number){
    prismaClient.user.update({
      where: {
        id: userid
      },
      data: {
        RefreshToken: undefined
      }
    })
  }
  async claimUser(userid:number, newToken:string): Promise<boolean>{
    //TODO send logout to user
    const result = await prismaClient.user.update({
      where: {
        id: userid
      },
      data: {
        RefreshToken: newToken
      }
    })
    return result.RefreshToken === newToken;
  }
}
