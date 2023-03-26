<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';
  import { sumValues } from '$utils/functions.js';

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
  $: expenditures = sumValues($GameData.resources.expenditures);
  $: savings = job.income - expenditures;
</script>

<div id="container">
  <img src={`/images/migrants/${migrant.name}.png`} alt={migrant.name} />
  <p>
    You are working as a <b>{job.title}</b> for <b>{job.hours}</b> hours a week and earn a monthly
    income of <b>${job.income}</b>. The expenses for your household's basic needs are
    <b>${expenditures}</b> this means this means that you have
    <b>{savings < 0 ? '-' : ''}${Math.abs(savings)}</b> for other expenses.
  </p>
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
</style>
