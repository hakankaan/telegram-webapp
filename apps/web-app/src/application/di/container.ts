import { UserRepositoryImpl } from '../../infrastructure/repositories';
import { AuthServiceImpl } from '../services';
import { localStorage } from '../../infrastructure/local-storage';

class Container {
  private _userRepository: UserRepositoryImpl | null = null;
  private _authService: AuthServiceImpl | null = null;

  get userRepository(): UserRepositoryImpl {
    if (!this._userRepository) {
      this._userRepository = new UserRepositoryImpl(localStorage);
    }
    return this._userRepository;
  }

  get authService(): AuthServiceImpl {
    if (!this._authService) {
      this._authService = new AuthServiceImpl(this.userRepository);
    }
    return this._authService;
  }
}

export const container = new Container();
