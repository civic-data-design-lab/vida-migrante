<script>
  import { GameData } from '$gameData';
  import Carousel from '$components/Carousel.svelte';
</script>

<div id="header">
  <h1>Who are the</h1>
  <h1>migrants?</h1>
</div>
<Carousel />
<button
  on:click={() => {
    GameData.selectMigrant({ name: 'Carlos' });
  }}
>
  Select
</button>

<style>
  #header {
    margin: 5vh;
  }
  h1 {
    font-size: 30pt;
    width: fit-content;
    margin: 0;
  }
</style>
