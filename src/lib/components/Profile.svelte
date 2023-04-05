<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs as jobsEN } from '$gameFiles/jobs.json';
  import { jobs as jobsES } from '$gameFiles/jobs-es.json';
  import { Languages } from '$lib/utils/types';
  import { page } from '$app/stores';

  $: language = $page.data.language;
  let jobs;
  $: if (language === Languages.ENGLISH) jobs = jobsEN;
  else jobs = jobsES;

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
  const essentials = new Set(['rent', 'food', 'health', 'household_utilities_essential']);
  $: expenditures = Object.entries($GameData.resources?.expenditures).reduce(
    (a, b) => a + (essentials.has(b[0]) ? b[1] : 0),
    0
  );
  $: income = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;
  $: savings = income - expenditures;
</script>

<div id="container">
  <div class="">
    <h1 style="padding:0; margin:0;">{migrant.name}</h1>
  </div>
  <img src={`/images/migrants/${migrant.name}.png`} alt={migrant.name} />
  {#if language === Languages.ENGLISH}
    <p>
      You are working as a <b>{job.title}</b> for <b>{job.hours}</b> hours a week and earn a monthly
      income of <b>${income}</b>. The expenses for your household's basic needs are
      <b>${expenditures}</b>; this means that you have
      <b>{savings < 0 ? '-' : ''}${Math.abs(savings)}</b> for other expenses.
    </p>
  {:else}
    <p>
      Tienes un empleo como <b>{job.title}</b>. Trabajas <b>{job.hours}</b> horas a la semana y
      tienes un ingreso mensual de <b>${job.income}</b>. Los gastos para las necesidades básicas de
      tu hogar son de
      <b>${expenditures}</b>, esto significa que tienes
      <b>{savings < 0 ? '-' : ''}${Math.abs(savings)}</b> para otros gastos.
    </p>
  {/if}
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
