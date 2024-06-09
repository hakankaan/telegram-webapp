<script lang="ts">
  import { container } from '../../application/di';
  import type { User } from '../../domain/entities/user';
  import { UserNotFoundError } from '../../application/errors';

  let telegramId = '';
  let password = '';
  let token = '';
  let isLoggedIn = false;
  let isTokenValid = false;
  let user: User | undefined;
  let errorMessage = '';

  const authService = container.authService;
  const userRepository = container.userRepository;

  async function login() {
    try {
      isLoggedIn = await authService.login(telegramId, password);
      if (isLoggedIn) {
        user = await userRepository.findByTelegramId(telegramId);
        errorMessage = '';
      } else {
        errorMessage = 'Invalid credentials';
      }
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        errorMessage = 'User not found';
      } else {
        errorMessage = 'An error occurred during login';
      }
      console.error("Login failed:", error);
    }
  }

  async function validateToken() {
    try {
      isTokenValid = await authService.validateToken(telegramId, token);
      if (!isTokenValid) {
        isLoggedIn = false;
        user = undefined;
        errorMessage = 'Invalid token';
      } else {
        errorMessage = '';
      }
    } catch (error) {
      errorMessage = 'An error occurred during token validation';
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
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
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
    {#if errorMessage}
      <p class="error">{errorMessage}</p>
    {/if}
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
  .error {
    color: red;
  }
</style>
