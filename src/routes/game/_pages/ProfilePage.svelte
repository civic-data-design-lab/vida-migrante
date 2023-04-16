<script>
  import { GameData } from '$gameData';
  import Profile from '$components/Profile.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  // Get the page data
  $: language = $page.data.language;
</script>

<div id="container">
  <Profile />
  {#if language === Languages.ENGLISH}
    <p><b>You are ready to start your journey in Ecuador.</b></p>
  {:else}
    <p><b>Puedes empezar tu experiencia en Ecuador.</b></p>
  {/if}
  <button class="button" id="begin-button" on:click={GameData.advanceGameState}>
    {#if language === Languages.ENGLISH}
      Next
    {:else}
      Siguiente
    {/if}
  </button>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      height: 100%;
  }

  #begin-button {
    height: 5vh;
    width: 50%;
    border: 0;
    border-radius: 2.5vh;
    font: 18pt 'sirenia';
  }
</style>
