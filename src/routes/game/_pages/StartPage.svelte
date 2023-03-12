<script>
  import Timed from '$lib/components/Timed.svelte';
  import { GameData } from '$lib/stores/gameData';
</script>

<Timed waitTimeMs={2000} callback={GameData.advanceGameState}>
  <h1>Start Game</h1>
</Timed>
