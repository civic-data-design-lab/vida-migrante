<script>
  import { GameData } from '$gameData';
</script>

<h1>
  Month {$GameData.round + 1}
</h1>
<button class="button" on:click={GameData.advanceGameState}>Continue</button>

<style>
  h1 {
    text-align: center;
  }
</style>
