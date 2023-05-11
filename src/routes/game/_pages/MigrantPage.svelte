<script>
  import { onMount } from 'svelte';
  import { GameData } from '$gameData';
  import Carousel from '$components/Carousel.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';
  import Modal from '$components/Modal.svelte';
  import LearnMore from "$components/LearnMore.svelte";

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
        migrants. We used the K-means clustering algorithm. Clustering is an unsupervised
        machine-learning technique that clusters data according to feature similarities. The
        objective of K-means clustering is to group data together to find k clusters by discovering
        underlying patterns in the data. The algorithm included variables such as gender, age,
        migratory status, household composition, income, and expenses.
      {:else}
        El análisis de datos de nuestra encuesta muestra que estos son los “tipos” o perfiles más
        comunes de migrantes. Utilizamos el algoritmo de agrupamiento de K-medias. La agrupación en
        clústeres es una técnica de aprendizaje automático no supervisada que agrupa los datos según
        las similitudes de las características. El objetivo de la agrupación en clústeres de
        K-medias es agrupar datos para encontrar k clústeres mediante el descubrimiento patrones
        subyacentes en los datos. El algoritmo incluyó variables como género, edad, estatus
        migratorio, composición del hogar, ingresos y gastos.
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
</style>
