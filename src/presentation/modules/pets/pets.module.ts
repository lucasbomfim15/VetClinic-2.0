import { Module } from "@nestjs/common";
import PetsService from "src/application/services/pet/pets.service";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import PetsController from "src/presentation/controllers/pets/pets.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export default class PetsModule {}
