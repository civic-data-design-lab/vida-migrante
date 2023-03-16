<script>
  import { GameData } from '$gameData';
</script>

<h1>Your expenses for the month:</h1>
<h3>Open the expenses panel to see how much you spent this month.</h3>

<button class="button" on:click={GameData.advanceGameState}>Continue</button>

<style>
  h1,
  h3 {
    margin: 0;
  }
</style>
