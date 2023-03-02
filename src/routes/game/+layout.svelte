<script>
  import { GameData } from '$lib/stores/gameData';
  import { GameStates } from '$lib/utils/types';
  import { onMount } from 'svelte';
  import Loading from './Loading.svelte';

  let loading = true;
  onMount(() => {
    // Client-side-rendering took over so loading can be set to false. This is
    // done since we need to wait for the browser to load the game state from
    // local storage.
    loading = false;
  });

  let showDevNav = false;
</script>

{#if loading}
  <Loading />
{:else}
  <slot />
  <nav>
    <button class="button navbar-btn" on:click={() => (showDevNav = !showDevNav)}
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
          <button on:click={() => localStorage.removeItem('gameData')}
            >Clear local storage/reset game data (needs refresh)</button
          >
        </li>
      </ul>
    {/if}
  </nav>
  <section>
    <ul class="temp-resources">
      {#if !$GameData.resources}
        <li>No resources yet, select a migrant first</li>
      {:else}
        <li>
          Money: {$GameData.resources.money}
        </li>
        <li>
          Time: {$GameData.resources.time}
        </li>
        <li>
          Wellbeing: {$GameData.resources.wellbeing}
        </li>
      {/if}
    </ul>
  </section>
{/if}

<style>
  nav {
    position: absolute;
    top: 0;
  }

  ul {
    background-color: rgba(255, 255, 255, 0.5);
  }

  section {
    position: absolute;
    bottom: 0;
  }

  .temp-resources {
    display: flex;
    gap: 1rem;
    margin: 0;
  }
</style>
