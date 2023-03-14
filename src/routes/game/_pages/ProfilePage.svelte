<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';
  import Drawer from '$components/Drawer.svelte';

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
</script>

<div id="container">
  <h1>How to Play?</h1>
  <p>You will draw a card on each round.</p>
  <p>
    There are four rounds, representing one full year in your life. The cards could be a <b
      >Life Event</b
    >
    card or an <b>Assistance</b> card. When you get a <b>Life Event</b> card, you will have to make
    a decision on how to cope with that event, a <b>Coping Strategy</b>. This decision will take
    money and/or time from you.
  </p>
  <p>
    The goal is to finish the game using fewest <b>Coping Strategies</b>, and with some money in
    your balance.
  </p>
  <p>
    Migrant: {migrant?.name}
    <br />
    Job: {job?.title}
  </p>
  <button class="button" id="begin-button" on:click={GameData.advanceGameState}>Begin</button>
</div>
<Drawer>
  <div id="drawer-body" slot="body">
    <h1>DRAWER</h1>
  </div>
</Drawer>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  #begin-button {
    height: 5vh;
    width: 50%;
    border-radius: 2.5vh;
    font: 18pt 'sirenia';
  }

  #drawer-body {
    text-align: center;
  }
</style>
