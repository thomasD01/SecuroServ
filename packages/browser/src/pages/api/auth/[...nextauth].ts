import NextAuth from "next-auth";

import SecuroServProvider from '../../../securoServProvider'

export default NextAuth({
  providers: [
    SecuroServProvider()
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60*5
  },
  callbacks: {
    async jwt({token, account}){
      if(account){
        token.access_token = account.access_token
      }
      return token;
    },
    async session({session, token, user}) {
      session.access_token = token.access_token;
      console.log(session);
      return session;
    }
  }
});
