import { Provider } from "next-auth/providers";

const provider = ():Provider => {
  let auth_url  = 'http://localhost:3000/oauth/authorize';
  let token_url = 'http://localhost:3000/oauth/token';
  let info_url  = 'http://localhost:3000/user/me';
  if(process.env.NODE_ENV === 'production'){
    auth_url  = `http://${process.env.HOSTNAME}:${process.env.PORT}/oauth/authorize`;
    token_url = `http://${process.env.HOSTNAME}:${process.env.PORT}/oauth/token`;
    info_url  = `http://${process.env.HOSTNAME}:${process.env.PORT}/user/me`;
  }
  return {
    id: "securoserv",
    name: "SecuroServ",
    type: "oauth",
    authorization: "https://kauth.kakao.com/oauth/authorize",
    token: "https://kauth.kakao.com/oauth/token",
    userinfo: "https://kapi.kakao.com/v2/user/me",
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