<script>
  import { onMount } from 'svelte';

  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  let firstName = '';

  onMount(() => {
    firstName = getQueryParam('firstname');
  });
</script>

<h1>Welcome, {firstName}!</h1>