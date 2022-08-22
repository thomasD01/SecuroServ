import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { readFile } from 'fs/promises'
 
import { staticRender } from './loginPage'
import { getRequest } from './db/database'

@Injectable()
export class AppService {
  async getAuthorize(
    client_id: string,
    redirect_uri: string,
    state: string,
    response: Response
  ){
    const app = staticRender(redirect_uri);
    let data = await readFile(join(__dirname, '../public/index.html'), 'utf8')
    data = data.replace('<div id="root"></div>',`<div id="root">${app}</div>`)

    return response.send(data);
  }

  async getAccessToken(code: string): Promise<
    {
      access_token: string,
      token_type: string,
      expires_in: number,
      scope: string, 
      refresh_token: string
    }>{
    const request = await getRequest(code);
    return Promise.resolve({
      access_token: request?.access_token!,
      token_type: 'bearer',
      expires_in: 3600,
      scope: 'identity',
      refresh_token: request?.refresh_token!
    });
  }
}
