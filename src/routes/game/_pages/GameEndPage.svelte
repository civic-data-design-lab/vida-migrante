<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';

  let success = true;
  function toggle() {
    success = !success;
  }
</script>

<h1>
  Your household is {#if success}doing better!{:else}still struggling{/if}
</h1>

<div id="footer">
  <button on:click={toggle}>Toggle Success</button>
  <button class="button" on:click={GameData.advanceGameState}> Try Again </button>
  <a href="/about">About</a>
  <a href="/policy">Policy Recommendations</a>
</div>

<style>
  h1 {
    text-align: center;
    font-size: min(43pt, 12vw);
    padding-left: 2.5vw;
    padding-right: 2.5vw;
  }
  #footer {
    height: 15vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .button {
    height: 6vh;
    width: 50%;
    border-radius: 3vh;
    font-size: 18pt;
  }
</style>
