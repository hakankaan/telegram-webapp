import type { User } from "../../domain/entities";

export interface UserRepository {
  save(user: User): Promise<void>;
  findByTelegramId(telegramId: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
}