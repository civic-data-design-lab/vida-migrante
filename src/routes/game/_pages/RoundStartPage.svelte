<script>
  import { GameData } from '$gameData';
</script>

<h1>
  MONTH {$GameData.round + 1} START
</h1>
<button class="button" on:click={GameData.advanceGameState}>Continue</button>
