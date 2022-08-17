import { Controller, Get } from '@nestjs/common';
import { OrgaService } from './orga.service';

@Controller('/organization')
export class OrgaController {
  constructor(private readonly appService: OrgaService  ) {}
  
}
