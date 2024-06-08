
import { AuthServiceImpl } from '../auth-service';
import { UserRepository } from '../../interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user';

describe('AuthService', () => {
  let authService: AuthServiceImpl;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findByTelegramId: jest.fn(),
      getAllUsers: jest.fn(),
    };
    authService = new AuthServiceImpl(userRepository);
  });

  it('should sign up a new user', async () => {
    const telegramId = '12345';
    const password = 'password';
    (userRepository.findByTelegramId as jest.Mock).mockResolvedValue(undefined);

    const token = await authService.signUp(telegramId, password);

    expect(userRepository.save).toHaveBeenCalledWith(expect.objectContaining({
      telegramId,
      password,
    }));
    expect(token).toBeDefined();
  });

  it('should login a user with correct credentials', async () => {
    const telegramId = '12345';
    const password = 'password';
    const user: User = {
      id: '123',
      telegramId,
      password,
      createdAt: new Date(),
      token: 'token',
    };
    (userRepository.findByTelegramId as jest.Mock).mockResolvedValue(user);

    const result = await authService.login(telegramId, password);

    expect(result).toBe(true);
  });

  it('should not login a user with incorrect credentials', async () => {
    const telegramId = '12345';
    const password = 'wrongpassword';
    const user: User = {
      id: '123',
      telegramId,
      password: 'password',
      createdAt: new Date(),
      token: 'token',
    };
    (userRepository.findByTelegramId as jest.Mock).mockResolvedValue(user);

    const result = await authService.login(telegramId, password);

    expect(result).toBe(false);
  });

  it('should validate a correct token', async () => {
    const telegramId = '12345';
    const token = 'validtoken';
    const user: User = {
      id: '123',
      telegramId,
      password: 'password',
      createdAt: new Date(),
      token,
    };
    (userRepository.findByTelegramId as jest.Mock).mockResolvedValue(user);

    const result = await authService.validateToken(telegramId, token);

    expect(result).toBe(true);
  });

  it('should not validate an incorrect token', async () => {
    const telegramId = '12345';
    const token = 'invalidtoken';
    const user: User = {
      id: '123',
      telegramId,
      password: 'password',
      createdAt: new Date(),
      token: 'validtoken',
    };
    (userRepository.findByTelegramId as jest.Mock).mockResolvedValue(user);

    const result = await authService.validateToken(telegramId, token);

    expect(result).toBe(false);
  });
});
