import { Module } from "@nestjs/common";
import { TutorsService } from "src/application/services/tutor/tutors.service";
import { PrismaModule } from "src/infra/prisma/prisma.module";
import { TutorsController } from "src/tutors/tutors.controller";

@Module({
  imports: [PrismaModule],
  controllers: [TutorsController],
  providers: [TutorsService],
})
export class TutorsModule {}
