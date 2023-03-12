<script>
  import { GameData } from '$gameData';
  import Timed from '$lib/components/Timed.svelte';

  $: expenseKeys = [...Object.keys($GameData.resources.expenditures)];
</script>

<Timed callback={GameData.advanceGameState} waitTimeMs={2000}>
  <h1>Your expenses for the month:</h1>
  <ul>
    {#each expenseKeys as expense}
      <li>
        {expense}: -${$GameData.resources.expenditures[expense]}
      </li>
    {/each}
  </ul>
</Timed>
