<script>
  import { GameData } from '$gameData';
  import cardBack from '$images/card-back.png';
  import TapIndicator from '$components/TapIndicator.svelte';
  import { getOrdinalSuffix } from '$lib/utils/functions';
  import { NUM_TO_ORDINAL_ARR } from '$lib/utils/types';
  import { Languages } from '$lib/utils/types';
  import { page } from '$app/stores';

  $: language = $page.data.language;

  $: round = $GameData.round + 1; // Round is 0-indexed in game data, 1 indexed here
  $: ordinalSuffix = getOrdinalSuffix(round, { language });
  $: ordinalRound = NUM_TO_ORDINAL_ARR[language][round - 1];

  $: tapMessage =
    language === Languages.ENGLISH ? 'Tap to draw a card' : 'Click para sacar tarjeta';
</script>

<h1>
  {round}<sup>{ordinalSuffix}</sup>
  {#if language === Languages.ENGLISH}Month{:else}Mes{/if}
</h1>
<!-- Game Data store will automatically draw a card -->
<TapIndicator message={tapMessage} on:click={GameData.advanceGameState} disabled={round !== 1}>
  <button id="draw-card">
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" src={cardBack} alt="Card back" />
    <img class="card-back" id="top-card" src={cardBack} alt="Card back" />
  </button>
</TapIndicator>

{#if language == Languages.ENGLISH}
  <p>
    Draw your
    <b>{ordinalRound}</b>
    card to see the {ordinalRound}
    event and make a decision on how to cope with it.
  </p>
{:else}
  <p>
    Selecciona la
    <b>{ordinalRound}a</b>
    carta para ver el {ordinalRound}{round === 2 || round === 4 ? 'o' : ''} evento y toma una decisión
    sobre cómo enfrentarlo.
  </p>
{/if}

<style>
  h1 {
    margin-top: 0;
  }

  p {
    padding: 0 1rem;
  }

  button {
    all: unset;
    width: 200px;
    height: 290px;
    position: relative;
  }

  button:hover {
    cursor: pointer;
  }

  #top-card {
    transition: transform 150ms ease;
  }
  button:hover #top-card {
    transform: translateY(-20px);
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
