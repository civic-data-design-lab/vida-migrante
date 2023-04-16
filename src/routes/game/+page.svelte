<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';
  import { onMount } from 'svelte';

  import MigrantPage from './_pages/MigrantPage.svelte';
  import JobSelectPage from './_pages/JobSelectPage.svelte';
  import ProfilePage from './_pages/ProfilePage.svelte';
  import DecisionPage from './_pages/DecisionPage.svelte';
  import DrawCardPage from './_pages/DrawCardPage.svelte';
  import AssistancePage from './_pages/AssistancePage.svelte';
  import GameEndPage from './_pages/GameEndPage.svelte';
  import GamePage from './GamePage.svelte';
  import StartPage from './_pages/StartPage.svelte';
  import RoundStartPage from './_pages/RoundStartPage.svelte';
  import Drawer from '$components/Drawer.svelte';
  import Dashboard from '$components/Dashboard.svelte';
  import MigrantBanner from './MigrantBanner.svelte';
  import { WindowHeight } from '$lib/stores/windowHeight';

  $: state = $GameData.state;

  let drawer;
  let toggleDrawer;
  onMount(() => {
    toggleDrawer = () => drawer.toggleDrawer();
  });

  $: gamePages = new Map([
    [
      GameStates.START,
      { component: StartPage, hasDrawer: false, hasMigrantBanner: false, props: {} },
    ],
    [
      GameStates.MIGRANT_SELECT,
      { component: MigrantPage, hasDrawer: false, hasMigrantBanner: false, props: {} },
    ],
    [
      GameStates.JOB_SELECT,
      { component: JobSelectPage, hasDrawer: false, hasMigrantBanner: false, props: {} },
    ],
    [
      GameStates.PROFILE,
      { component: ProfilePage, hasDrawer: true, hasMigrantBanner: false, props: {} },
    ],
    [
      GameStates.ROUND_START,
      { component: RoundStartPage, hasDrawer: false, hasMigrantBanner: false, props: {} },
    ],
    [
      GameStates.DRAW_CARD,
      { component: DrawCardPage, hasDrawer: false, hasMigrantBanner: true, props: {} },
    ],
    [
      GameStates.DECISION,
      { component: DecisionPage, hasDrawer: true, hasMigrantBanner: true, props: { toggleDrawer } },
    ],
    [
      GameStates.ASSISTANCE,
      {
        component: AssistancePage,
        hasDrawer: true,
        hasMigrantBanner: false,
        props: { toggleDrawer },
      },
    ],
    [
      GameStates.GAME_END,
      { component: GameEndPage, hasDrawer: true, hasMigrantBanner: true, props: {} },
    ],
  ]);

  $: pageData = gamePages.get(state);

  /** The bottom y position of the drawer from the top in pixels. */
  let drawerBottomThreshold;
  $: {
    const windowHeightVh = $WindowHeight / 100;
    drawerBottomThreshold = Math.min(
      windowHeightVh * 85,
      $WindowHeight - ($WindowHeight < 700 ? 145 : 165)
    );
    console.debug('Set drawer bottom to', drawerBottomThreshold);
  }
</script>

<svelte:head>
  <title>Game | Ecuador Integration</title>
</svelte:head>
{#if pageData.hasMigrantBanner}
  <MigrantBanner migrantId={$GameData.migrantId} jobId={$GameData.jobId} />
{/if}
<!-- Key ensures that the animation gets applied on each state transition -->
{#key state}
  <GamePage
    hasBanner={pageData.hasMigrantBanner}
    hasDrawer={pageData.hasDrawer}
    drawerBottomThreshold={$WindowHeight - drawerBottomThreshold}
  >
    <!-- See https://svelte.dev/repl/74593f36569a4c268d8a6ab277db34b5?version=3.12.1
      for passing props -->
    <svelte:component this={pageData.component} {...pageData.props} />
  </GamePage>
{/key}
{#if pageData.hasDrawer}
  <Drawer bind:this={drawer} botThreshold={drawerBottomThreshold}>
    <div id="drawer-body" slot="body">
      <Dashboard />
    </div>
  </Drawer>
{/if}

<style>
  #drawer-body {
    text-align: center;
    overflow: scroll;
    inline-size: 90%;
    height: calc(80 * var(--vh));
  }

  #drawer-body::-webkit-scrollbar {
    display: none;
  }
</style>
