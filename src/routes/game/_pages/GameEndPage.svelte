<script>
  import { GameData } from '$gameData';
  import { isFoodSecure, sumValues } from '$utils/functions.js';
  import { page } from '$app/stores';
  import { DAYS_IN_WEEK, Languages } from '$lib/utils/types';
  import enCards from '$gameFiles/assistances.json';
  import spCards from '$gameFiles/assistances-es.json';

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

  $: assistanceIDs = $GameData.pastActions
    .filter((action) => action.assistanceId)
    .map((assistance) => assistance.assistanceId);
  $: assistances = (language === Languages.ENGLISH ? enCards : spCards).filter((card) =>
    assistanceIDs.includes(card.id)
  );
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
      Your income went from <b>${job.income}</b> to
      <b class={incomeSuccess ? 'accent-green' : 'accent-red'}>${income}</b>. Your household income
      is still below
      <b class="accent-red">$793, the National Average in Ecuador</b>{#if incomeSuccess}.
      {:else}, and it's still not enough to provide for your family's basic needs, including the <b
          >Family Baskets</b
        >of food.
        {#if foodSecure}Despite this, your family is still <b class="accent-green">not vulnerable</b
          >
        {:else}Due to some life events, your family is also <b class="accent-red">vulnerable</b
          >{/if}.{/if}
    </p>
  {:else}
    <p>
      Tus ingresos cambiaron de <b>${job.income}</b> a
      <b class={incomeSuccess ? 'accent-green' : 'accent-red'}>${income}</b>. Los ingresos de tu
      hogar siguen por debajo de
      <b class="accent-red">$793, el promedio en Ecuador</b>{#if incomeSuccess}.
      {:else}, y aún no son suficientes cubrir las necesidades básicas de tú familia incluyendo las <b
          >Canastas Básicas</b
        >
        de comida. Tu familia <b class="accent-red">vulnerabilidad</b>.{/if}
    </p>
  {/if}
  {#if incomeSuccess}
    {#if language === Languages.ENGLISH}
      <p>
        Your income is still not enough to buy a <b class="accent-blue">Basic Family Basket</b>, you
        can't afford a <b class="accent-yellow">Vital Family Basket</b> either. Your family is
        <b class="accent-red">vulnerable.</b>
      </p>
    {:else}
      <p>
        Tus ingresos aún no son suficientes para adquirir una <b class="accent-blue"
          >Canasta Familiar Básica</b
        >, tampoco puedes adquirir una <b class="accent-yellow">Canasta Familiar Vital</b>. Tu
        familia
        <b class="accent-red">tiene vulnerabilidad.</b>
      </p>
    {/if}
  {/if}
  {#if language === Languages.ENGLISH}
    <p>
      You have been able to receive assistance, <b>{assistances[0].name}</b> and
      <b>{assistances[1].name}</b>, from United Nations agencies, NGOs, among others. These are
      usually provided to help migrants who are in a difficult situation, and they are usually given
      just once.
    </p>
  {:else}
    <p>
      Por parte de agencias de Naciones Unicadas, ONGs, entre otras, has podido recibirir
      asistencias para <b>{assistances[0].name}</b> y <b>{assistances[1].name}</b>. Por lo general,
      se dan a los migrantes para ayudarlos cuando se encuentran en una situación difícil y
      generalmente se brindan solo una vez.
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

  @media only screen and (max-height: 700px), (max-width: 380px) {
    h1 {
      margin-top: 15px;
      font-size: 22pt;
      line-height: 22pt;
    }

    p {
      margin-block: 11px;
      font-size: 12pt;
      line-height: 15pt;
    }

    .button {
      height: 5vh;
      font-size: 16pt;
    }

    a {
      font-size: 12pt;
    }
  }
</style>
