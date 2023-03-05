<script>
  import { GameData } from '$gameData';
  import Timed from '$lib/components/Timed.svelte';
</script>

<Timed callback={GameData.advanceGameState} waitTimeMs={2000}>
  <h1>Your income for the month:</h1>
  <h2>${$GameData.resources?.income.salary}</h2>
</Timed>
