import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getAuthorize(){
    return 'hello';
  }
}
