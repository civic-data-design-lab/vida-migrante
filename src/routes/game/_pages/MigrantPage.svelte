<script>
  import { onMount } from 'svelte';
  import { GameData } from '$gameData';
  import Carousel from '$components/Carousel.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  // Get the page data
  $: language = $page.data.language;

  let migrant = 0;
  const observerOptions = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  onMount(() => {
    const lControl = document.getElementById('left-control');
    const rControl = document.getElementById('right-control');
    const slides = [...document.querySelectorAll('.carousel-slide')];

    function createUpdater(i) {
      return function updater(entries) {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= observerOptions.threshold) migrant = i;
          lControl.hidden = migrant === 0;
          rControl.hidden = migrant === slides.length - 1;
          lControl.onclick = () => slides[migrant - 1].scrollIntoView();
          rControl.onclick = () => slides[migrant + 1].scrollIntoView();
        });
      };
    }

    slides.forEach((slide, i) => {
      const observer = new IntersectionObserver(createUpdater(i), observerOptions);
      observer.observe(slide);
    });
  });
</script>

<div class="constrained centered-column">
  <div id="header">
    {#if language === Languages.ENGLISH}
      <h1>Take the journey as</h1>
    {:else}
      <h1>Vive la experiencia como</h1>
    {/if}
  </div>
  <Carousel />

  <button
    class="button"
    on:click={() => {
      GameData.advanceGameState({ migrantId: migrant });
    }}
  >
    {#if language === Languages.ENGLISH}
      Select
    {:else}
      Seleccionar
    {/if}
  </button>
</div>

<style>
  #header {
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    width: 95%;
  }

  h1 {
    font-size: 30pt;
    width: fit-content;
    margin: 0;
  }

  button {
    margin: 0;
    margin-bottom: 2.5vh;
    cursor: pointer;
  }
</style>
