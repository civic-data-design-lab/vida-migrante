<script>
  import { GameData } from '$gameData';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { Languages } from '$lib/utils/types';
  import { page } from '$app/stores';
  import { isFoodSecure, sumValues } from '$utils/functions.js';

  $: language = $page.data.language;
  const jobs = $page.data.jobsData.jobs;

  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
  const essentials = new Set(['rent', 'food', 'health', 'household_utilities_essential']);
  $: expenditures = Object.entries($GameData.resources?.expenditures).reduce(
    (a, b) => a + (essentials.has(b[0]) ? b[1] : 0),
    0
  );
  $: income = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;
  $: savings = income - expenditures;
  $: foodSecure = isFoodSecure(
    sumValues($GameData.resources?.expenditures),
    migrant.householdSize,
    $GameData.resources?.copingLevel
  );
</script>

<div id="container">
  <div class="">
    <h1 style="padding:0; margin:0;">{migrant.name}</h1>
  </div>
  <img src={`/images/migrants/${migrant.name}.svg`} alt={migrant.name} />
  {#if language === Languages.ENGLISH}
    <p>
      You are working as a <b>{job.title}</b> for <b>{job.hours}</b> hours a week and earn a monthly
      income of <b>${income}</b>. The expenses for your household's basic needs are
      <b>${expenditures}</b>, but this does not account for all the household's expenses; this means
      that you
      {#if savings >= 0}
        have <b>${savings}</b> for other expenses.
      {:else}
        need <b>${-savings}</b> more to be able to afford your basic expenses.
      {/if}
      No one else in the household has income to help with home expenses.
      <br /><br />
      You and your family are {#if foodSecure}<b style="color: var(--accent-green)"
          >not vulnerable</b
        >{:else}<b style="color: var(--accent-red)">vulnerable</b>{/if}.
    </p>
  {:else}
    <p>
      Tienes un empleo como <b>{job.title}</b>. Trabajas <b>{job.hours}</b> horas a la semana y
      tienes un ingreso mensual de <b>${job.income}</b>. Los gastos para las necesidades básicas de
      tu hogar son de
      <b>${expenditures}</b>, pero este número no incluye otros gastos del hogar, esto significa que
      {#if savings >= 0}
        tienes <b>${savings}</b> para otros gastos.
      {:else}
        necesitas <b>${-savings}</b> más para sus gastos básicos.
      {/if}
      Nadie más en su familia aporta ingresos al hogar.
      <br /><br />
      Tu familia {#if foodSecure}<b style="color: var(--accent-green)">no tiene vulnerabilidad</b
        >{:else}<b style="color: var(--accent-red)">tiene vulnerabilidad</b>{/if}.
    </p>
  {/if}
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
  }

  img {
    height: 30vh;
  }

  p {
    margin-bottom: 0;
    line-height: 16pt;
  }

  @media only screen and (max-height: 700px) {
    p {
      font-size: 12pt;
    }
  }
</style>
