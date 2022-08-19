import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { readFile } from 'fs/promises'
 
import { staticRender } from './loginPage'

@Injectable()
export class AppService {
  async getAuthorize(
    client_id: string,
    redirect_uri: string,
    state: string,
    response: Response
  ){
    const app = staticRender(client_id, redirect_uri, state);

    let data = await readFile(join(__dirname, '../public/index.html'), 'utf8')
    data = data.replace('<div id="root"></div>',`<div id="root">${app}</div>`)

    return response.send(data);
  }
}
