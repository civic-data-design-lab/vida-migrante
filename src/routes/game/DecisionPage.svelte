<script>
  import cardData from '$gameFiles/card-data.json';
  import { GameData } from '$gameData';
  import Card from '$components/Card.svelte';

  /** @type {import('$types').Card} */
  $: card = cardData[$GameData.currentCardId];

  let flipped = false;

  const makeDecision = (optionId) => {
    // TODO: Handle invalid decision
    GameData.advanceGameState({ optionId });
  };
</script>

{#if flipped}
  <h1>{card.category}</h1>
  <h2>{card.prompt}</h2>
  <ul>
    {#each card.options as option (option.id)}
      <li>
        <button on:click={() => makeDecision(option.id)}>
          {option.description}
        </button>
      </li>
    {/each}
  </ul>
{:else}<Card {card} />{/if}

<button on:click={() => (flipped = !flipped)}>Flip card</button>

<style>
  li {
    margin: 1rem 0;
  }
</style>
