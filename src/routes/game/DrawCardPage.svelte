<script>
  import { GameData } from '$gameData';
  import { NUM_TO_ORDINAL_ARR } from '$lib/utils/types';
  import cardBack from '$images/card-back.png';

  // FIXME: Fix once we are keeping track of round number
  $: round = $GameData.round;
  $: ordinalRound = NUM_TO_ORDINAL_ARR[round];
</script>

<h1>Round {round + 1}</h1>
<!-- Game Data store will automatically draw a card -->
<button on:click={() => GameData.advanceGameState()}>
  <div class="tap-indicator">
    <h6>Tap to draw a card</h6>
  </div>
  <div class="fade-in-out">
    <img src={cardBack} alt="Card back" />
    <img src={cardBack} alt="Card back" />
    <img src={cardBack} alt="Card back" />
  </div>
</button>

<p>
  Migrants face many challenges on a daily basis. Draw your <b>{ordinalRound}</b> card to see the {ordinalRound}
  event and make a decision on how to cope with it.
</p>

<style>
  button {
    /* TODO: Fix later */
    all: unset;
    width: 200px;
    height: 280px;
    position: relative;
  }

  button:hover {
    cursor: pointer;
  }

  .tap-indicator {
    position: absolute;
    z-index: 1;
    inset: 0;
    height: 100%;
    display: grid;
    place-items: center;
  }

  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    top: 0;
    border-radius: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }

  img:nth-child(1) {
    transform: rotate(5deg);
  }
  img:nth-child(2) {
    transform: rotate(-5deg);
  }
</style>
