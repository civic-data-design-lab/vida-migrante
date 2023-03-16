<!-- Wrapper component for the game pages. Handles transitions between pages and
overall styling. Actual page components can be found in the `_pages/` directory.
-->
<script>
  import { fade } from 'svelte/transition';
  import { WindowHeight } from '$lib/stores/windowHeight';

  export let hasBanner;
  export let hasDrawer;

  const rootPadding = 10;

  $: paddingTop = hasBanner ? 120 : rootPadding;
  let paddingBottom;
  let botThreshold;
  $: {
    let vh = $WindowHeight / 100;
    botThreshold = vh * 10;
    paddingBottom = (hasDrawer ? botThreshold : 0) + rootPadding;
  }
</script>

<main
  class="game-page"
  in:fade={{ duration: 200, delay: 200 }}
  out:fade={{ duration: 200, delay: 0 }}
  style:padding-top="{paddingTop}px"
  style:padding-bottom="{paddingBottom}px"
  style:height="{$WindowHeight}px"
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
    padding: 2.5vw;
    /* height: 100vh; */

    overflow-y: scroll;
  }
</style>
