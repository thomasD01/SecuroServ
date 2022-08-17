import { Module } from "@nestjs/common";
import { OrgaController } from "./orga.controller";
import { OrgaService } from "./orga.service";

@Module({
  imports: [],
  controllers: [OrgaController],
  providers: [OrgaService]
})
export class OrgaModule {}