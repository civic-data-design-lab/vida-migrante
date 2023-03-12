<script>
  import { fade } from 'svelte/transition';
</script>

<main transition:fade={{ duration: 200 }}>
  <h1>LOADING...</h1>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    height: 100vh;
  }
</style>
