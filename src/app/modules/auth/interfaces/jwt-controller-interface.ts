import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

export interface IJwtController {
  handle(body: AuthenticateBodySchema): Promise<{ access_token: string }>;
}
