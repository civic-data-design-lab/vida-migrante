<script>
  import { GameData } from '$gameData';
</script>

<h1>Your income for the month:</h1>
<h2>${$GameData.resources?.income.salary}</h2>
<button class="button" on:click={() => GameData.advanceGameState()}>Continue</button>
