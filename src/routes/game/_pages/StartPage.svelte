<script>
  import Timed from '$lib/components/Timed.svelte';
  import { GameData } from '$lib/stores/gameData';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  const language = $page.data.language;
</script>

<Timed waitTimeMs={2000} callback={GameData.advanceGameState}>
  <h1>
    {#if language === Languages.ENGLISH}
      Entering Ecuador...
    {:else}
      Entrando a Ecuador...
    {/if}
  </h1>
</Timed>
