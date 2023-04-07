<script>
  import { GameData } from '$gameData';
  import { isFoodSecure, sumValues } from '$utils/functions.js';
  import { page } from '$app/stores';

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
</script>

<h1>
  You and your family are {#if incomeSuccess && foodSecure}doing better!{:else}still struggling{/if}
</h1>
<div id="body">
  <p>
    Your income went from <b>${job.income}</b> to
    <b class={incomeSuccess ? 'accent-green' : 'accent-red'}>${income}</b>. Your household income is
    still below
    <b class="accent-red">$793, the National Average in Ecuador</b>{#if incomeSuccess}.{:else}, and
      it's still not enough to provide for your family's basic needs, including the <b
        >Family Baskets</b
      >
      of food. {#if foodSecure}Despite this, your family is still <b class="accent-green"
          >food secure</b
        >
      {:else}Due to some life events, your family is also <b class="accent-red">food insecure</b
        >{/if}.{/if}
  </p>
  {#if incomeSuccess}
    <p>
      Your income is still not enough to buy a <b class="accent-yellow">Basic Family Basket</b> of
      food, but you can afford a <b class="accent-blue">Vital Family Basket</b>. {#if foodSecure}Your
        family is <b class="accent-green">food secure</b>{:else}Despite your increased income, your
        family is still <b class="accent-red">food insecure</b>{/if}.
    </p>
  {/if}
  <p>
    You work {job.hours} hours every week.
  </p>
</div>

<div id="footer">
  <button
    class="button"
    on:click={() => {
      GameData.advanceGameState();
      location.reload();
    }}
  >
    Try Again
  </button>
  <a href="/about">About</a>
  <a href="/policy">Policy Recommendations</a>
</div>

<style>
  h1 {
    text-align: center;
    font-size: min(30pt, 12vw);
    padding-left: 2.5vw;
    padding-right: 2.5vw;
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
    width: 50%;
    border-radius: 3vh;
    font-size: 18pt;
  }
</style>
