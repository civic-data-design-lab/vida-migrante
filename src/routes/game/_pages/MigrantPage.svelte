<script>
  import { onMount } from 'svelte';
  import { GameData } from '$gameData';
  import Carousel from '$components/Carousel.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';
  import Modal from '$components/Modal.svelte';
  import LearnMore from '$components/LearnMore.svelte';

  // Get the page data
  $: language = $page.data.language;

  let showModal = false;
  let migrant = 0;
  const observerOptions = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  onMount(() => {
    const lControl = document.getElementById('left-control-hitbox');
    const rControl = document.getElementById('right-control-hitbox');
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
    <h1>
      {#if language === Languages.ENGLISH}
        Select a profile for this experience
      {:else}
        Selecciona un perfil para vivir la experiencia
      {/if}
    </h1>
  </div>
  <LearnMore>
    <h1 slot="title">
      {#if language === Languages.ENGLISH}
        Profiles
      {:else}
        Perfiles
      {/if}
    </h1>
    <p slot="body">
      {#if language === Languages.ENGLISH}
        The data analysis for our survey shows that these are the most common “types” or profiles of
        migrants. We used the K-means clustering algorithm. The grouping included variables such as
        gender, age, migratory status, household composition, income, and expenses. If you want to
        learn more about this method
        <a
          target="_blank"
          href="https://www.dropbox.com/sh/yl6mzpgsbp1nwfo/AADosvws6XWdoS3JJtAKV0Jwa?dl=0"
          >click here.</a
        >
      {:else}
        El análisis de datos de nuestra encuesta muestra que estos son los “tipos” o perfiles más
        comunes de migrantes. Utilizamos el algoritmo de agrupamiento de K-medias. El agrupamiento
        incluyó variables como género, edad, estatus migratorio, composición del hogar, ingresos y
        gastos. Si deseas saber más sobre este método dá
        <a
          target="_blank"
          href="https://www.dropbox.com/sh/yl6mzpgsbp1nwfo/AADosvws6XWdoS3JJtAKV0Jwa?dl=0"
          >clic aquí.</a
        >
      {/if}
    </p>
  </LearnMore>

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

  span {
    font-family: var(--font-sirenia);
    margin-top: 5px;
    font-size: 12pt;
  }

  span:hover,
  span:active {
    cursor: pointer;
    text-decoration: underline;
    color: #000;
  }

  @media only screen and (max-height: 750px), (max-width: 400px) {
    h1 {
      font-size: 23pt;
    }
  }
</style>
