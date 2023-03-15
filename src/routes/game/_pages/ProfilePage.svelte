<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';
  import Drawer from '$components/Drawer.svelte';
  import Dashboard from '$components/Dashboard.svelte';

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
</script>

<div id="container">
  <img src={`/images/migrants/${migrant.name}.png`} alt={migrant.name} />
  <p><b>
    You have acquired a job as a {job.title}. You will be working {job.hours} hours a week and earn a monthly
    income of ${job.income}. Your expenses for your household's basic needs will be $TODO; this means you
    will have only $TODO for other unexpected expenses.
  </b></p>
  <p><b>You are ready to start your journey in Ecuador.</b></p>
  <button class="button" id="begin-button" on:click={GameData.advanceGameState}>Next</button>
</div>
<Drawer>
  <div id="drawer-body" slot="body">
    <Dashboard />
  </div>
</Drawer>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    height: 30vh;
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
