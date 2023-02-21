<script>
  import { GameData } from '$gameData';
  import { NUM_TO_ORDINAL_ARR } from '$lib/utils/types';

  // FIXME: Fix once we are keeping track of round number
  // $: round = $GameData.round
  let roundNum = 0;

  $: ordinalRound = NUM_TO_ORDINAL_ARR[roundNum];
</script>

<main>
  <h1>Round {roundNum}</h1>
  <!-- Game Data store will automatically draw a card -->
  <button on:click={() => GameData.advanceGameState()}>
    <h6>Tap to draw a card</h6>
  </button>

  <p>
    Migrants face many challenges on a daily basis. Draw your <b>{ordinalRound}</b> card to see the {ordinalRound}
    event and make a decision on how to cope with it.
  </p>
</main>

<style>
  button {
    border: none;
    background-color: lightblue;
    padding: 2rem;
  }
</style>
