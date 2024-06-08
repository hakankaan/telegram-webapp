<!-- src/App.svelte -->
<script>
  import { Router, Route, Link } from 'svelte-routing';
  import SignUp from './presentation/sign-up/sign-up.svelte';
  import Profile from './presentation/profile/profile.svelte';

</script>

<main>
  <Router>
    <Route path="/" component={SignUp} />
    <Route path="signup" component={SignUp} />
    <Route path="profile" component={Profile} />
  </Router>
</main>

<style>
  nav {
    margin-bottom: 1rem;
  }
  nav a {
    margin-right: 1rem;
  }
</style>
