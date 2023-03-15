<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';
  import { migrants } from '$gameFiles/migrant-data.json';
  import { jobs } from '$gameFiles/jobs.json';

  import MigrantPage from './_pages/MigrantPage.svelte';
  import JobSelectPage from './_pages/JobSelectPage.svelte';
  import ProfilePage from './_pages/ProfilePage.svelte';
  import DecisionPage from './_pages/DecisionPage.svelte';
  import DrawCardPage from './_pages/DrawCardPage.svelte';
  import AssistancePage from './_pages/AssistancePage.svelte';
  import TempGamePage from './_pages/TempGamePage.svelte';
  import IncomePage from './_pages/IncomePage.svelte';
  import ExpensesPage from './_pages/ExpensesPage.svelte';
  import GamePage from './GamePage.svelte';
  import StartPage from './_pages/StartPage.svelte';
  import RoundStartPage from './_pages/RoundStartPage.svelte';

  import Drawer from '$components/Drawer.svelte';
  import Dashboard from '$components/Dashboard.svelte';

  $: state = $GameData.state;
  $: migrant = migrants[$GameData.migrantId];
  $: job = jobs[$GameData.jobId];

  const gamePages = new Map([
    [GameStates.START, StartPage],
    [GameStates.MIGRANT_SELECT, MigrantPage],
    [GameStates.JOB_SELECT, JobSelectPage],
    [GameStates.PROFILE, ProfilePage],
    [GameStates.ROUND_START, RoundStartPage],
    [GameStates.INCOME, IncomePage],
    [GameStates.EXPENSES, ExpensesPage],
    [GameStates.DRAW_CARD, DrawCardPage],
    [GameStates.DECISION, DecisionPage],
    [GameStates.ASSISTANCE, AssistancePage],
    [GameStates.GAME_END, TempGamePage],
  ]);
  const pagesWithDrawer = new Set([
    GameStates.PROFILE,
    GameStates.DECISION,
    GameStates.ASSISTANCE,
    GameStates.GAME_END,
  ]);

  $: currentPage = gamePages.get(state);
</script>

<svelte:head>
  <title>Game | Ecuador Integration</title>
</svelte:head>
<!-- Key ensures that the animation gets applied on each state transition -->
{#key state}
  <GamePage>
    <!-- See https://svelte.dev/repl/74593f36569a4c268d8a6ab277db34b5?version=3.12.1
      for passing props -->
    <svelte:component this={currentPage} />
  </GamePage>
{/key}
{#if pagesWithDrawer.has(state)}
  <Drawer>
    <div id="drawer-body" slot="body">
      <Dashboard />
    </div>
  </Drawer>
{/if}

<style>
  #drawer-body {
    text-align: center;
  }
</style>
