<script>
  import { GameData } from '$lib/stores/gameData';
  import { GameStates } from '$lib/utils/types';

  let showDevNav = false;
</script>

<slot />
<nav>
  <button on:click={() => (showDevNav = !showDevNav)}>{showDevNav ? 'Hide' : 'Show'} dev nav</button
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
<section>
  <ul class="temp-resources">
    <li>
      Money: {$GameData.resources.money}
    </li>
    <li>
      Time: {$GameData.resources.time}
    </li>
    <li>
      Wellbeing: {$GameData.resources.wellbeing}
    </li>
  </ul>
</section>

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
