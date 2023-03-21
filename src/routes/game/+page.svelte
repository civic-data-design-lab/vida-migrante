<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';

  import MigrantPage from './_pages/MigrantPage.svelte';
  import JobSelectPage from './_pages/JobSelectPage.svelte';
  import ProfilePage from './_pages/ProfilePage.svelte';
  import DecisionPage from './_pages/DecisionPage.svelte';
  import DrawCardPage from './_pages/DrawCardPage.svelte';
  import AssistancePage from './_pages/AssistancePage.svelte';
  import GameEndPage from './_pages/GameEndPage.svelte';
  import IncomePage from './_pages/IncomePage.svelte';
  import ExpensesPage from './_pages/ExpensesPage.svelte';
  import GamePage from './GamePage.svelte';
  import StartPage from './_pages/StartPage.svelte';
  import RoundStartPage from './_pages/RoundStartPage.svelte';

  import Drawer from '$components/Drawer.svelte';
  import Dashboard from '$components/Dashboard.svelte';
  import MigrantBanner from './MigrantBanner.svelte';

  $: state = $GameData.state;

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
    [GameStates.GAME_END, GameEndPage],
  ]);
  const pagesWithDrawer = new Set([
    GameStates.PROFILE,
    GameStates.DECISION,
    GameStates.EXPENSES,
    GameStates.ASSISTANCE,
    GameStates.GAME_END,
  ]);
  const pagesWithMigrantBanner = new Set([
    GameStates.INCOME,
    GameStates.EXPENSES,
    GameStates.DRAW_CARD,
    GameStates.DECISION,
    GameStates.GAME_END,
  ]);

  $: currentPage = gamePages.get(state);
  $: hasBanner = pagesWithMigrantBanner.has(state);
  $: hasDrawer = pagesWithDrawer.has(state);
</script>

<svelte:head>
  <title>Game | Ecuador Integration</title>
</svelte:head>
{#if hasBanner}
  <MigrantBanner migrantId={$GameData.migrantId} jobId={$GameData.jobId} />
{/if}
<!-- Key ensures that the animation gets applied on each state transition -->
{#key state}
  <GamePage {hasBanner} {hasDrawer}>
    <!-- See https://svelte.dev/repl/74593f36569a4c268d8a6ab277db34b5?version=3.12.1
      for passing props -->
    <svelte:component this={currentPage} />
  </GamePage>
{/key}
{#if hasDrawer}
  <Drawer>
    <div id="drawer-body" slot="body">
      <Dashboard />
    </div>
  </Drawer>
{/if}

<style>
  #drawer-body {
    text-align: center;
    overflow: scroll;
  }
</style>
