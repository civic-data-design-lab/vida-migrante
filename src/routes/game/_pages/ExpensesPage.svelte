<script>
  import { GameData } from '$gameData';

  $: expenseKeys = [...Object.keys($GameData.resources.expenditures)];
</script>

<h1>Your expenses for the month:</h1>
<ul>
  {#each expenseKeys as expense}
    <li>
      {expense}: -${$GameData.resources.expenditures[expense]}
    </li>
  {/each}
</ul>
<button class="button" on:click={() => GameData.advanceGameState()}>Continue</button>
