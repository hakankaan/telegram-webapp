<script>
  import { Router, Route, Link } from 'svelte-routing';
  import SignUp from './presentation/sign-up/sign-up.svelte';
  import Profile from './presentation/profile/profile.svelte';
  export let url = "";
</script>

<main>
  <Router url={url}>
    <nav>
      <Link to="/">Sign Up</Link>
      <Link to="profile">Profile</Link>
    </nav>
    <div>
      <Route path="/" component={SignUp} />
      <Route path="signup" component={SignUp} />
      <Route path="profile" component={Profile} />
    </div>
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
