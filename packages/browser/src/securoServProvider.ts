import { Provider } from "next-auth/providers";

type User = {
  id: string;
  name: string;
  prename: string;
  username: string;
  email: string;
  authToken?: string;
  refreshToken?: string;
}

let isDev = process.env.NODE_ENV !== 'production';

const auth_url  = isDev ? 'http://localhost:3001/auth/login': `${process.env.AUTH_URL}/auth/login`;
const token_url = isDev ? 'http://localhost:3001/auth/token': `${process.env.AUTH_URL}/auth/token`;
const info_url  = isDev ? 'http://localhost:3001/user/info' : `${process.env.AUTH_URL}/user/info`;

const provider = (): Provider=> {
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
    authorize: authorize
  }
}
export default provider;

async function authorize(credentials: Record<string, string>|undefined): Promise<User|null>{
  try{
    if(!credentials){
      return null;
    }
    const res = await fetch(auth_url, {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const decodedRes : {
      authToken: string|null,
      refreshToken: string|null
    } = await res.json();
    if(decodedRes.authToken && decodedRes.refreshToken){
      let user:User = await(await fetch(info_url,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${decodedRes.authToken}`
        }
      })).json();

      user = { 
        ...user,
        authToken: decodedRes.authToken,
        refreshToken: decodedRes.refreshToken
      }
      return user;             
    }
    return null;
  }
  catch(error){
    if(isDev){
      console.error(error);
    }
    return null;
  }
}

