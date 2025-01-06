export interface IJwtService {
  authenticate(
    email: string,
    password: string,
  ): Promise<{ access_token: string }>;
}
