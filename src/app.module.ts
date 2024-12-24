import { Module } from "@nestjs/common";
import { TutorsModule } from "./presentation/modules/tutors/tutors.module";
import { PrismaService } from "./infra/prisma/prisma.service";

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [TutorsModule],
})
export class AppModule {}
