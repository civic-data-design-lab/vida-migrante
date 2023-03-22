<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';
  import { sumValues } from "$utils/functions.js";

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
  $: expenditures = sumValues($GameData.resources.expenditures);
  $: savings = job.income - expenditures;
</script>

<div id="container">
  <img src={`/images/migrants/${migrant.name}.png`} alt={migrant.name} />
  <p>
      You have acquired a job as a <b>{job.title}</b>. You will be working <b>{job.hours}</b> hours a week and earn
      a monthly income of <b>${job.income}</b>. Your expenses for your household's basic needs will be
      <b>${expenditures}</b>; this means you will have only <b>{savings < 0? '-':''}${Math.abs(savings)}</b> for other unexpected expenses.
  </p>
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

  img {
    height: 30vh;
  }

  #begin-button {
    height: 5vh;
    width: 50%;
    border-radius: 2.5vh;
    font: 18pt 'sirenia';
  }
</style>
