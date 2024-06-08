export interface AuthService {
  signUp(telegramId: string, password: string): Promise<string>;
  login(telegramId: string, password: string): Promise<boolean>;
  validateToken(telegramId: string, token: string): Promise<boolean>;
}