<script>
  import { GameData } from '$gameData';
  import Profile from '$components/Profile.svelte';
</script>

<div id="container">
  <Profile />
  <p><b>You are ready to start your journey in Ecuador.</b></p>
  <button class="button" id="begin-button" on:click={GameData.advanceGameState}>Next</button>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #begin-button {
    height: 5vh;
    width: 50%;
    border: 0;
    border-radius: 2.5vh;
    font: 18pt 'sirenia';
  }
</style>
