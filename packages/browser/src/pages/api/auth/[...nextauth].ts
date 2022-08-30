import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import SecuroServProvider from '../../../securoServProvider'
import database from "../../../db/database";

export default NextAuth({
  adapter: PrismaAdapter(database),
  providers: [
    SecuroServProvider()
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60*5
  },
  callbacks: {
    async jwt({
      token, 
      user
    }){

      if(user){
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token
    }){
      //@ts-ignore
      session.user = token.user;
      console.log(session);
      return session;
    }
  }
});
