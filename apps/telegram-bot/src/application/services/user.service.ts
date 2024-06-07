import { UserRepository, UserService } from "../interfaces";

export class UserServiceImpl implements UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(telegramId: string, firstName: string) {
    const existingUser = await this.userRepository.getUserByTelegramId(telegramId);
    if (!existingUser) {
      console.log(`Registering user ${firstName}`)
      await this.userRepository.saveUser(telegramId, firstName);
    }
  }

  async getUserByTelegramId(telegramId: string): Promise<string | undefined> {
    const user = await this.userRepository.getUserByTelegramId(telegramId);
    return user ? user.firstName : undefined;
  }
}