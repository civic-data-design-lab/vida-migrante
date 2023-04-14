<script>
  import { GameData } from '$gameData';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  $: language = $page.data.language;
</script>

<h1>
  {#if language === Languages.ENGLISH}Month{:else}Mes{/if}
  {$GameData.round + 1}
</h1>
<button class="button" on:click={GameData.advanceGameState}
  >{#if language === Languages.ENGLISH}Continue{:else}Continuar{/if}</button
>

<style>
  h1 {
    text-align: center;
  }
</style>
