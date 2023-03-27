<script>
  import { GameData } from '$gameData';
  import cardBack from '$images/card-back.png';
  import TapIndicator from '$components/TapIndicator.svelte';
  import { getOrdinalSuffix } from '$lib/utils/functions';
  import { NUM_TO_ORDINAL_ARR } from '$lib/utils/types';

  $: round = $GameData.round + 1; // Round is 0-indexed in game data, 1 indexed here
  $: ordinalSuffix = getOrdinalSuffix(round);
  $: ordinalRound = NUM_TO_ORDINAL_ARR[round];
  $: ordinalRoundOrig = NUM_TO_ORDINAL_ARR[$GameData.round];
</script>

<h1>{round}<sup>{ordinalSuffix}</sup> Month</h1>
<!-- Game Data store will automatically draw a card -->
<TapIndicator
  message="Tap to draw a card"
  on:click={GameData.advanceGameState}
  disabled={round !== 1}
>
  <button id="draw-card">
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" src={cardBack} alt="Card back" />
  </button>
</TapIndicator>

<p>
  Draw your
  <b>{round}<sup>{ordinalSuffix}</sup></b>
  card to see the {ordinalRoundOrig}
  event and make a decision on how to cope with it.
</p>

<style>
  button {
    /* TODO: Fix later */
    all: unset;
    width: 200px;
    height: 290px;
    position: relative;
  }

  button:hover {
    cursor: pointer;
  }

  .card-back {
    position: absolute;
    object-fit: cover;
    width: 100%;
    top: 0;
    border-radius: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  .card-back:nth-child(1) {
    transform: rotate(5deg);
  }
  .card-back:nth-child(2) {
    transform: rotate(-5deg);
  }
</style>
