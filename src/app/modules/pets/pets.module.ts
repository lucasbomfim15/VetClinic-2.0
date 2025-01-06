import { Module } from "@nestjs/common";
import PetsService from "src/app/modules/pets/services/pets.service";
import { PrismaModule } from "src/app/shared/prisma/prisma.module";
import PetsController from "src/app/modules/pets/controllers/pets.controller";
import PetsRepository from "./repository/pets.repository";
import TutorsRepository from "../tutors/repository/tutors.repository";

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository, TutorsRepository],
})
export default class PetsModule {}
