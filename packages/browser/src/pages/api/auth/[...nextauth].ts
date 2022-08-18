import NextAuth from "next-auth";

import SecuroServProvider from '../../../securoServProvider'

export default NextAuth({
  providers: [
    SecuroServProvider(process.env.OAUTH_CLIENT_ID,process.env.OAUTH_SECRET)
  ],
});
