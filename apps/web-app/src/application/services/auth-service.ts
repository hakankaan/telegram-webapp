import { generateUuid } from "@telegram-webapp/shared-utils";
import type { User } from "../../domain/entities";
import type { AuthService, UserRepository } from "../interfaces";
import { UserAlreadyExistsError, UserNotFoundError } from "../errors";

export class AuthServiceImpl implements AuthService {
  constructor(private userRepository: UserRepository) {}

  async signUp(telegramId: string, password: string): Promise<string> {
    const userExists = await this.userRepository.findByTelegramId(telegramId);
    if (userExists) throw new UserAlreadyExistsError();

    const token = this.generateToken();

    const user: User = {
      id: generateUuid(),
      telegramId: telegramId,
      password: password,
      createdAt: new Date(),
      token
    }
    this.userRepository.save(user);
    return token;
  }

  async login(telegramId: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if(!user) throw new UserNotFoundError()

    return user !== undefined && user.password === password;
  }

  async validateToken(telegramId: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findByTelegramId(telegramId);
    if(!user) throw new UserNotFoundError()

    return user !== undefined && user.token === token;
  }

  private generateToken(): string {
    return generateUuid()
  }
}
