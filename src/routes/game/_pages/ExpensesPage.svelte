<script>
  import { GameData } from '$gameData';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  $: language = $page.data.language;
</script>

{#if language == Languages.ENGLISH}
  <h1>Your expenses for the month</h1>
  <h3>Open the expenses panel to see how much you spent this month.</h3>
{:else}
  <h1>Gastos mensuales</h1>
  <h3>Abre el panel de gastos para verlos.</h3>
{/if}

{#if language == Languages.ENGLISH}
  <button class="button" on:click={GameData.advanceGameState}>Continue</button>
{:else}
  <button class="button" on:click={GameData.advanceGameState}>Continuar</button>
{/if}

<style>
  h1,
  h3 {
    margin: 0;
  }
</style>
