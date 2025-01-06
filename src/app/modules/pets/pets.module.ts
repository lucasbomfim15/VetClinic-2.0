import { Module } from "@nestjs/common";
import PetsService from "src/app/modules/pets/services/pets.service";
import { PrismaModule } from "src/app/shared/prisma/prisma.module";
import PetsController from "src/app/modules/pets/controllers/pets.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export default class PetsModule {}
