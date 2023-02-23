<script>
  import { GameData } from '$lib/stores/gameData';
  import { GameStates } from '$lib/utils/types';

  let showDevNav = false;
</script>

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
    </ul>
  {/if}
</nav>

<style>
  nav {
    position: absolute;
    top: 0;
  }

  ul {
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
