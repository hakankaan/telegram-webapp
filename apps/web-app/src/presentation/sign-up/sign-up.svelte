<script lang="ts">
  import { container } from '../../application/di';

  let telegramId = '';
  let password = '';
  let token = '';


  const authService = container.authService

  async function signUp() {
    token = await authService.signUp(telegramId, password);
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
  {#if token}
    <div>
      <p>Authorization Token: {token}</p>
      <p>Copy and save it somewhere safe. Confirm by clicking "OK".</p>
      <button on:click={() => token = ''}>OK</button>
    </div>
  {/if}
</main>
