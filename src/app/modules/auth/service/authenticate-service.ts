import { Injectable, UnauthorizedException } from "@nestjs/common";
import TutorsRepository from "../../tutors/repository/tutors.repository";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { IJwtService } from "../interfaces/jwt-service-interface";

@Injectable()
export default class AuthenticateService implements IJwtService {
  constructor(
    private readonly tutorsRepository: TutorsRepository,
    private readonly prismaService: PrismaService,
    private jwt: JwtService,
  ) {}

  async authenticate(email: string, password: string) {
    const tutor = await this.tutorsRepository.findTutorByEmail(email);

    if (!tutor) {
      throw new UnauthorizedException(
        "As credenciais do usuário não correspondem.",
      );
    }

    const isPasswordValid = await compare(password, tutor.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        "As credenciais do usuário não correspondem.",
      );
    }

    const accessToken = this.jwt.sign({ sub: tutor.id });

    return {
      access_token: accessToken,
    };
  }
}
