<script>
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';
  import { GameData } from '$lib/stores/gameData';
  import { WindowHeight } from '$lib/stores/windowHeight';
  import { GameStates } from '$lib/utils/types';
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';
  import PageHead from '$lib/components/PageHead.svelte';

  /** Data from `+layout.server.js` */
  export let data;

  $: language = data.language;

  let loading = true;
  onMount(() => {
    // Client-side-rendering took over so loading can be set to false. This is
    // done since we need to wait for the browser to load the game state from
    // local storage.
    loading = false;
  });

  let showDevNav = false;

  let windowHeight;
  $: {
    WindowHeight.set(windowHeight);
    console.log('Set window height to', windowHeight);
  }
</script>

<PageHead {...data.seoProps} />
{#if loading}
  <Loading />
{:else}
  <div class="constrained">
    <slot />
  </div>
  <nav>
    <button class="nav-btn" on:click={() => (showDevNav = !showDevNav)}
      >{showDevNav ? 'Hide' : 'Show'} dev nav</button
    >
    {#if showDevNav}
      <ul>
        {#each Object.keys(GameStates) as state (state)}
          <li>
            <button on:click={() => GameData.update((g) => ({ ...g, state: GameStates[state] }))}>
              GOTO {state}
            </button>
          </li>
        {/each}
        <li>
          <a href="/game" data-sveltekit-reload on:click={() => localStorage.removeItem('gameData')}
            >Clear local storage/reset game data</a
          >
        </li>
        <li>
          <LanguageToggle />
        </li>
      </ul>
    {/if}
  </nav>
{/if}
<svelte:window bind:innerHeight={windowHeight} />

<style>
  nav {
    position: absolute;
    top: 0;
    z-index: 3;
  }

  .nav-btn {
    transform: translateY(-130%);
  }

  .nav-btn:focus {
    transform: none;
  }

  ul {
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
