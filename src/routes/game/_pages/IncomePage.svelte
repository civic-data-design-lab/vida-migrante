<script>
  import { GameData } from '$gameData';
</script>

<h1>Your income for the month:</h1>
<h1>Salary: +${$GameData.resources?.income.salary}</h1>
<h1>Assistances: +${$GameData.resources?.income.assistance}</h1>
<button class="button" on:click={GameData.advanceGameState}>Continue</button>
