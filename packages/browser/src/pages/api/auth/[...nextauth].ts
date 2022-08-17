import NextAuth from "next-auth";

import SecuroServProvider from '../../../securoServProvider'

export default NextAuth({
  providers: [
    SecuroServProvider()
  ],
});
