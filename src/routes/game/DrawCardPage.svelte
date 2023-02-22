<script>
  import { GameData } from '$gameData';
  import { NUM_TO_ORDINAL_ARR } from '$lib/utils/types';
  import cardBack from '$images/card-back.png';
  import touchIcon from '$lib/assets/images/touch-app.svg';

  // FIXME: Fix once we are keeping track of round number
  $: round = $GameData.round;
  $: ordinalRound = NUM_TO_ORDINAL_ARR[round];
</script>

<h1>Round {round + 1}</h1>
<!-- Game Data store will automatically draw a card -->
<button id="draw-card" on:click={() => GameData.advanceGameState()}>
  <div class="tap-indicator">
    <img src={touchIcon} alt="" />
    <p for="draw-card">Tap to draw a card</p>
  </div>
  <div class="fade-in-out">
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" src={cardBack} alt="Card back" />
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
