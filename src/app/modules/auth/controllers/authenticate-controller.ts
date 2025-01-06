import { Body, Controller, Post } from "@nestjs/common";

import { z } from "zod";
import AuthenticateService from "../service/authenticate-service";
import { IJwtController } from "../interfaces/jwt-controller-interface";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("api/v1/sessions")
export default class AuthenticateController implements IJwtController {
  constructor(private readonly authService: AuthenticateService) {}

  @Post()
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    return this.authService.authenticate(email, password);
  }
}
