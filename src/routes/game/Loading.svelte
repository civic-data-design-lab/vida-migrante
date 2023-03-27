<script>
  import { page } from '$app/stores';
  import { Languages } from '$types';
  import { fade } from 'svelte/transition';

  $: loadingMessage = $page.data.language === Languages.ENGLISH ? 'LOADING' : 'CARGANDO';
</script>

<main transition:fade={{ duration: 200 }}>
  <h1>{loadingMessage}...</h1>
</main>

<style>
  main {
    display: grid;
    place-items: center;
    height: 100vh;
  }
</style>
