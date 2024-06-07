import { User } from "../../domain/entities";

export interface UserRepository {
  saveUser(telegramId: string, firstName: string): Promise<void>;
  getUserByTelegramId(telegramId: string): Promise<User | undefined>;
}