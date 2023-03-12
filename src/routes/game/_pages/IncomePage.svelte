<script>
  import { GameData } from '$gameData';
  import Timed from '$lib/components/Timed.svelte';
</script>

<Timed callback={GameData.advanceGameState} waitTimeMs={3000}>
  <h1>Your income for the month:</h1>
  <h2>Salary (from your job): ${$GameData.resources?.income.salary}</h2>
  <h2>Assistances: ${$GameData.resources?.income.assistance}</h2>
</Timed>
