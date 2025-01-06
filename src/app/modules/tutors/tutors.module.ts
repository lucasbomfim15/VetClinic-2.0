import { Module } from "@nestjs/common";
import { TutorsController } from "src/app/modules/tutors/controllers/tutors.controller";
import TutorsService from "src/app/modules/tutors/services/tutors.service";
import { PrismaModule } from "src/app/shared/prisma/prisma.module";
import TutorsRepository from "./repository/tutors.repository";

@Module({
  imports: [PrismaModule],
  controllers: [TutorsController],
  providers: [TutorsService, TutorsRepository],
  exports: [TutorsRepository],
})
export class TutorsModule {}
