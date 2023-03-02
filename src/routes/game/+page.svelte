<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';

  import MigrantPage from './MigrantPage.svelte';
  import JobSelectPage from './JobSelectPage.svelte';
  import DecisionPage from './DecisionPage.svelte';
  import DrawCardPage from './DrawCardPage.svelte';

  $: state = $GameData.state;
  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];
</script>

<div id="container">
  {#if state === GameStates.START}
    <h1>START</h1>
  {:else if state === GameStates.MIGRANT_SELECT}
    <MigrantPage />
  {:else if state === GameStates.JOB_SELECT}
    <JobSelectPage />
  {:else if state === GameStates.INSTRUCTIONS}
    <h1>Instructions</h1>
    <p>Migrant: {migrant.name}</p>
    <p>Job: {job.title}</p>
    <button on:click={GameData.advanceGameState}>Begin</button>
  {:else if state === GameStates.ROUND_START}
    <h1>
      ROUND {$GameData.round + 1} START
    </h1>
  {:else if state === GameStates.INCOME}
    <h1>INCOME</h1>
  {:else if state === GameStates.EXPENSES}
    <h1>EXPENSES</h1>
  {:else if state === GameStates.DRAW_CARD}
    <DrawCardPage />
  {:else if state === GameStates.DECISION}
    <DecisionPage />
  {/if}
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 2.5vw;
    height: 100vh;
  }
</style>
