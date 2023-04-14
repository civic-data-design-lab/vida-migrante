<!-- Wrapper component for the game pages. Handles transitions between pages and
overall styling. Actual page components can be found in the `_pages/` directory.
-->
<script>
  import { fade } from 'svelte/transition';
  import { WindowHeight } from '$lib/stores/windowHeight';

  export let hasBanner;
  export let hasDrawer;

  export let drawerBottomThreshold;

  const rootPadding = 10;

  $: paddingTop = hasBanner ? 135 : rootPadding;
  let paddingBottom;
  $: {
    paddingBottom = (hasDrawer ? drawerBottomThreshold : 0) + rootPadding;
  }
</script>

<main
  class="game-page"
  in:fade={{ duration: 200, delay: 200 }}
  out:fade={{ duration: 200, delay: 0 }}
  style:padding-top="{paddingTop}px"
  style:padding-bottom="{paddingBottom}px"
  style:height="{$WindowHeight}px"
  style:overflow="hidden"
>
  <slot />
</main>

<style>
  .game-page {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 3vw;

    overflow-y: scroll;
  }

  .game-page::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    .game-page {
      min-width: 50%;
    }
  }
</style>
