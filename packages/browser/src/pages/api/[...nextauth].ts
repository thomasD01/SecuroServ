import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";

const provider = ():Provider => {
  return {
    id: "securoserv",
    name: "SecuroServ",
    type: "oauth",
    wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    }
  }
}

export default NextAuth({
  providers: [
    provider()
  ],
})