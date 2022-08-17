import { Provider } from "next-auth/providers";

const provider = ():Provider => {
  let auth_url  = 'http://localhost:3000/oauth/authorize';
  let token_url = 'http://localhost:3000/oauth/token';
  let info_url  = 'http://localhost:3000/user/me';
  if(process.env.NODE_ENV === 'production'){
    auth_url  = `${process.env.OAUTH_URL}/oauth/authorize`;
    token_url = `${process.env.OAUTH_URL}/oauth/token`;
    info_url  = `${process.env.OAUTH_URL}/user/me`;
  }
  return {
    id: "securoserv",
    name: "SecuroServ",
    type: "oauth",
    authorization: auth_url,
    token: token_url,
    userinfo: info_url,
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        prename: profile.prename,
        username: profile.username,
        email: profile.email
      }
    }
  }
}

export default provider;