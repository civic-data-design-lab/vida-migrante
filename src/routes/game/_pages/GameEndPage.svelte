<script>
  import { GameData } from '$gameData';
  import { jobs } from '$gameFiles/jobs.json';

  $: job = jobs[$GameData.jobId];
  let income = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;

  $: success = income > job.income;
</script>

<h1>
  You and your family are {#if success}doing better!{:else}still struggling{/if}
</h1>
<div id="body">
  <p>
    Your income went from <b>${job.income}</b> to <b class="accent-green">${income}</b>. Your
    household income is still below
    <b class="accent-red">$793, the National Average in Ecuador</b>{#if success}.{:else}, and it's
      still not enough to provide for your family's basic needs, including the <b>Family Baskets</b>
      of food.{/if}
  </p>
  {#if success}
    <p>
      Your income is still not enough to buy a <b class="accent-yellow">Basic Family Basket</b> of
      food, but you can afford a <b class="accent-blue">Vital Family Basket</b>.
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
