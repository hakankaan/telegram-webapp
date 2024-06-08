import type { UserRepository } from "../../application/interfaces";
import type { User } from "../../domain/entities";
import type { localStorage } from "../local-storage";



export class UserRepositoryImpl implements UserRepository {
  constructor(private storage: typeof localStorage) {}  

  async getAllUsers(): Promise<User[]> {
    const rawUsers = await this.storage.getItem('users');
    const currentUsers: User[] =  JSON.parse(rawUsers) || []
    return currentUsers;
  }

  async save(user: User): Promise<void> {
    const currentUsers = await this.getAllUsers();
    currentUsers.push(user);
    this.storage.setItem('users', JSON.stringify(currentUsers));
  }

  async findByTelegramId(telegramId: string): Promise<User | undefined> {
    const currentUsers = await this.getAllUsers();
    
    const userRecord = currentUsers.find(user => user.telegramId === telegramId);
    if (!userRecord) {
      return undefined;
    }
    const userEntity: User = {
      id: userRecord.id,
      telegramId: userRecord.telegramId,
      password: userRecord.password,
      createdAt: userRecord.createdAt,
      token: userRecord.token,
    }

    return userEntity;
  }
}
