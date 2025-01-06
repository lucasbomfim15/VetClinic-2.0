import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/app/shared/prisma/prisma.service";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("api/v1/sessions")
export default class AuthenticateController {
  constructor(
    private jwt: JwtService,
    private prismaService: PrismaService,
  ) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const tutor = await this.prismaService.tutor.findUnique({
      where: {
        email,
      },
    });

    if (!tutor) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const isPasswordValid = await compare(password, tutor.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials do not match.");
    }

    const acessToken = this.jwt.sign({ sub: tutor.id });

    return {
      acess_token: acessToken,
    };
  }
}
