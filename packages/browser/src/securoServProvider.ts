import { Provider } from "next-auth/providers";

const provider = (clientId: string, clientSecret: string): Provider => {
  let auth_url = 'http://localhost:3001/oauth/authorize';
  let token_url = 'http://localhost:3001/oauth/token';
  let info_url = 'http://localhost:3001/user/info';
  if (process.env.NODE_ENV === 'production') {
    auth_url = `${process.env.OAUTH_URL}/oauth/authorize`;
    token_url = `${process.env.OAUTH_URL}/oauth/token`;
    info_url = `${process.env.OAUTH_URL}/user/info`;
  }
  return {
    id: 'securoserv',
    name: 'SecuroServ',
    type: 'oauth',
    version: '2.0',
    authorization: {
      url: auth_url,
      params: {scope: 'identity'}
    },
    token: {
      url: token_url,
      params: {}
    },
    userinfo: {
      url: info_url,
      params: {}
    },
    clientId,
    clientSecret,
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        prename: profile.prename,
        username: profile.username,
        email: profile.email
      }
    }
  }
}

export default provider;
