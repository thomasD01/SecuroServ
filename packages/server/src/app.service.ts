import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { join } from 'path'
import { readFile } from 'fs/promises'
 
import { staticRender } from './loginPage'

@Injectable()
export class AppService {
  async getLoginPage( redirect_uri: string ){
    const app = staticRender(redirect_uri);
    let data = await readFile(join(__dirname, '../public/index.html'), 'utf8')
    data = data.replace('<div id="root"></div>',`<div id="root">${app}</div>`)

    return data;
  }
}
