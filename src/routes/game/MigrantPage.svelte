<script>
  import { onMount } from 'svelte';
  import { GameData } from '$gameData';
  import Carousel from '$components/Carousel.svelte';

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
        });
      };
    }

    slides.forEach((slide, i) => {
      const observer = new IntersectionObserver(createUpdater(i), observerOptions);
      observer.observe(slide);
    });
  });
</script>

<div id="header">
  <h1>Who are the</h1>
  <h1>migrants?</h1>
</div>
<Carousel />
<button
  on:click={() => {
    GameData.selectMigrant(migrant);
    GameData.advanceGameState();
  }}
>
  Select
</button>

<style>
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
