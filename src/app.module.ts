import { Module } from "@nestjs/common";
import { TutorsModule } from "./app/modules/tutors/tutors.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaService } from "./app/shared/prisma/prisma.service";
import { envSchema } from "./env";
import PetsModule from "./app/modules/pets/pets.module";
import AuthModule from "./app/modules/auth/auth.module";

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
