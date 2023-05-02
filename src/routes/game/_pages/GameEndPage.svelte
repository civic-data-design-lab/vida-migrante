<script>
  import { GameData } from '$gameData';
  import { isFoodSecure, sumValues } from '$utils/functions.js';
  import { page } from '$app/stores';
  import { DAYS_IN_WEEK, Languages } from '$lib/utils/types';
  import { elasticOut } from 'svelte/easing';

  $: language = $page.data.language;

  const jobs = $page.data.jobsData.jobs;
  const migrants = $page.data.migrantData.migrants;

  $: job = jobs[$GameData.jobId];
  let income = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;

  $: incomeSuccess = income > job.income;
  $: migrantInfo = migrants.find((migrant) => migrant.id === $GameData.migrantId);
  $: foodSecure = isFoodSecure(
    sumValues($GameData.resources?.expenditures),
    migrantInfo.householdSize,
    $GameData.resources?.copingLevel
  );

  $: hoursWorked = Math.floor(Math.round($GameData.resources?.time / DAYS_IN_WEEK));
</script>

<h1>
  {#if language === Languages.ENGLISH}
    You and your family are {#if incomeSuccess && foodSecure}doing better!{:else}still struggling{/if}
  {:else}
    Tu familia y tú {#if incomeSuccess && foodSecure}están un poco mejor!{:else}todavía tienen
      dificultades{/if}
  {/if}
</h1>
<div id="body">
  {#if language === Languages.ENGLISH}
    <p>
      Your income went from <b>${job.income}</b> to <b class={incomeSuccess ? 'accent-green' : 'accent-red'}>${income}</b>.
      Your household income is still below <b class="accent-red">$793, the National Average in Ecuador</b>{#if incomeSuccess}.
      {:else}, and it's still not enough to provide for your family's basic needs, including the <b>Family Baskets</b>of food.
      {#if foodSecure}Despite this, your family is still <b class="accent-green">not vulnerable</b>
      {:else}Due to some life events, your family is also <b class="accent-red">vulnerable</b>{/if}.{/if}
    </p>
  {:else}
    <p>
      Tus ingresos cambiaron de <b>${job.income}</b> a <b class={incomeSuccess ? 'accent-green' : 'accent-red'}>${income}</b>.
      Los ingresos de tu hogar siguen por debajo de <b class="accent-red">$793, el promedio en Ecuador</b>{#if incomeSuccess}.
      {:else}, y aún no son suficientes cubrir las necesidades básicas de tú familia incluyendo las <b>Canastas Básicas</b>
      de comida. {#if foodSecure}A pesar de esto, tu familia <b class="accent-green">no tiene vulnerabilidad</b>
      {:else}Debido a ciertos eventos, tu familia también tiene <b class="accent-red">vulnerabilidad</b>{/if}.{/if}
    </p>
  {/if}
  {#if incomeSuccess}
    {#if language === Languages.ENGLISH}
      <p>
        Your income is still not enough to buy a <b class="accent-blue">Basic Family Basket</b>, but
        you can afford a <b class="accent-yellow">Vital Family Basket</b>. {#if foodSecure}Your
        family is <b class="accent-green">food secure</b>{:else}Despite your increased income,
        your family is still <b class="accent-red">vulnerable</b>{/if}.
      </p>
    {:else}
      <p>
        Tus ingresos aún no son suficientes para adquirir una <b class="accent-blue">Canasta Familiar Básica</b>,
        pero puedes adquirir una <b class="accent-yellow">Canasta Familiar Vital</b>. {#if foodSecure}Tu
        familia tiene <b class="accent-green">food secure</b>{:else}A pesar de que tus ingresos aumentaron, tu y tú
        familia aún tienen <b class="accent-red">vulnerabilidad</b>{/if}.
      </p>
    {/if}
  {/if}
  {#if language === Languages.ENGLISH}
    <p>
      You work <b>~{hoursWorked}</b> hours each day.
    </p>
  {:else}
    <p>
      Trabajas <b>~{hoursWorked}</b> horas cada día.
    </p>
  {/if}
</div>

<div id="footer">
  <button class="button" on:click={GameData.advanceGameState}>
    {#if language === Languages.ENGLISH}
      Try Again
    {:else}
      Empezar de nuevo
    {/if}
  </button>
  <a href="/about" style="margin-top: 10px">
    {#if language === Languages.ENGLISH}
      About
    {:else}
      Acerca
    {/if}
  </a>
  <a href="/policy">
    {#if language === Languages.ENGLISH}
      Policy Recommendations
    {:else}
      Recomendaciones
    {/if}
  </a>
</div>

<style>
  h1 {
    text-align: center;
    font-size: min(30pt, 9vw);
    padding-left: 2.5vw;
    padding-right: 2.5vw;
    margin-bottom: 0;
  }

  #body {
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
    width: fit-content;
    border-radius: 3vh;
    font-size: 18pt;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-height: 700px) {
    h1 {
      margin-top: 15px;
    }

    p {
      margin-block: 11px;
    }

    .button {
      height: 5vh;
      font-size: 16pt;
    }

    a {
      font-size: 13pt;
    }
  }
</style>
