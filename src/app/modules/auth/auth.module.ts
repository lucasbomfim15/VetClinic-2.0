import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Env } from "src/env";
import { PrismaModule } from "src/app/shared/prisma/prisma.module";
import AuthenticateController from "src/app/modules/auth/controllers/authenticate-controller";
import JwtStrategy from "./jwt/jwt.strategy";

@Module({
  providers: [JwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true });
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true });

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: privateKey,
          publicKey: publicKey,
        };
      },
    }),
  ],
  controllers: [AuthenticateController],
})
export default class AuthModule {}
