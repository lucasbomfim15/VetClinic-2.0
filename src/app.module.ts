import { Module } from "@nestjs/common";
import { TutorsModule } from "./presentation/modules/tutors/tutors.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./infra/prisma/prisma.service";
import AuthModule from "./presentation/modules/auth/auth.module";
import { envSchema } from "./env";
import PetsModule from "./presentation/modules/pets/pets.module";

@Module({
  controllers: [],
  providers: [PrismaService],
  imports: [
    PetsModule,
    TutorsModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
