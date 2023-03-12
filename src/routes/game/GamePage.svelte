<!-- Wrapper component for the game pages. Handles transitions between pages and
overall styling. Actual page components can be found in the `_pages/` directory.
-->
<script>
  import { fade } from 'svelte/transition';
</script>

<main in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200, delay: 0 }}>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5vw;
    height: 100vh;
  }
</style>
