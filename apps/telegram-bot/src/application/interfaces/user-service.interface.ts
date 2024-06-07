export interface UserService {
  registerUser(telegramId: string, firstName: string): Promise<void>;
  getUserByTelegramId(telegramId: string): Promise<string | undefined>;
}