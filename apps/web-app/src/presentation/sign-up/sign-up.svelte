<script lang="ts">
  import { container } from "../../application/di";
  import { UserAlreadyExistsError } from "../../application/errors";



  let telegramId = '';
  let password = '';
  let token = '';
  let errorMessage = '';

  const authService = container.authService;

  async function signUp() {
    try {
      token = await authService.signUp(telegramId, password);
      errorMessage = '';
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        errorMessage = 'User already exists';
      } else {
        errorMessage = 'An error occurred during sign up';
      }
      console.error("Sign Up failed:", error);
    }
  }
</script>

<main>
  <h1>Sign Up</h1>
  <form on:submit|preventDefault={signUp}>
    <label>
      Telegram ID:
      <input type="text" bind:value={telegramId} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Sign Up</button>
  </form>
  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if token}
    <div>
      <p>Authorization Token: {token}</p>
      <p>Copy and save it somewhere safe. Confirm by clicking "OK".</p>
      <button on:click={() => token = ''}>OK</button>
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
