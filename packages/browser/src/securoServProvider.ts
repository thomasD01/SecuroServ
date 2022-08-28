import { CredentialsConfig } from "next-auth/providers";

type User = {}

const provider = (): CredentialsConfig=> {
  let auth_url = 'http://localhost:3001/auth/login';
  let token_url = 'http://localhost:3001/auth/token';
  let info_url = 'http://localhost:3001/user/info';
  if (process.env.NODE_ENV === 'production') {
    auth_url = `${process.env.OAUTH_URL}/auth/login`;
    token_url = `${process.env.OAUTH_URL}/auth/token`;
    info_url = `${process.env.OAUTH_URL}/user/info`;
  }
  return {
    name: 'SecuroServ',
    id: 'securoserv',
    type: 'credentials',
    credentials: {
      username: {
        label: 'Username',
        type: 'text'
      },
      password: {
        label: 'Password',
        type: 'password'
      }
    },
    async authorize(credentials): Promise<User| null>{
      return new Promise(async function(resolve, reject){
        try{
          if(!credentials){
            resolve(null);
            return;
          }
          const res = await fetch(auth_url, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          })
          const decodedRes = await res.json();
          if(decodedRes.access_token){
            
          }
          resolve(null);
        }
        catch(error){
          if(isDev){
            console.error(error);
          }
          reject('error authenticating user');
        }
      })
    }
  }
}

export default provider;
