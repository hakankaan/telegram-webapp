
<script lang="ts">
  import { UserRepositoryImpl } from '../../infrastructure/repositories';
  import { AuthServiceImpl } from '../../application/services';
  import type { User } from '../../domain/entities/user';
  import { localStorage } from '../../infrastructure/local-storage';

  let telegramId = '';
  let password = '';
  let token = '';
  let isLoggedIn = false;
  let isTokenValid = false;
  let user: User | undefined;

  const userRepository = new UserRepositoryImpl(localStorage);
  const authService = new AuthServiceImpl(userRepository);

  async function login() {
    try {
      isLoggedIn = await authService.login(telegramId, password);
      if (isLoggedIn) {
        user = await userRepository.findByTelegramId(telegramId);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  async function validateToken() {
    try {
      isTokenValid = await authService.validateToken(telegramId, token);
      if (!isTokenValid) {
        isLoggedIn = false;
        user = undefined;
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      isLoggedIn = false;
      user = undefined;
    }
  }
</script>

<main>
  {#if !isLoggedIn}
    <h1>Login</h1>
    <form on:submit|preventDefault={login}>
      <label>
        Telegram ID:
        <input type="text" bind:value={telegramId} required />
      </label>
      <label>
        Password:
        <input type="password" bind:value={password} required />
      </label>
      <button type="submit">Login</button>
    </form>
  {/if}
  {#if isLoggedIn && !isTokenValid}
    <h1>Token Validation</h1>
    <form on:submit|preventDefault={validateToken}>
      <label>
        Authorization Token:
        <input type="text" bind:value={token} required />
      </label>
      <button type="submit">Validate Token</button>
    </form>
  {/if}
  {#if isLoggedIn && isTokenValid && user}
    <div>
      <h2>User Profile</h2>
      <p>Telegram ID: {user.telegramId}</p>
      <p>Password: ********</p>
      <p>Created: {user.createdAt}</p>
    </div>
  {/if}
</main>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
