<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';

  import { Parallax, ParallaxLayer } from 'svelte-parallax';

  import { Languages } from '$lib/utils/types';
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';
  import arrowIcon from '$images/keyboard-arrow-down_119013.svg';
  import cddlLogo from '$images/cddl_logo_black.svg';
  import mitLogo from '$images/mit-logo-black-blue.png';
  import wfpLogo from '$images/wfp-logo-standard-black-en.svg';
  import usaidLogo from '$images/usaid_horizontal_RGB_Black.png';

  /** Page data loaded from `+layout.server.svelte` */
  export let data;
  $: language = data.language;

  //for transition
  let ready = false;
  const maxOffset = 500;
  let offset = tweened(0, {
    duration: 4500,
    easing: cubicInOut,
  });
  onMount(() => {
    ready = true;
    offset.set(maxOffset);
  });

  //for scrolling
  let y;
  let container;
</script>

<svelte:window bind:scrollY={y} />

{#if ready}
  <div id="container" class="centered-column" bind:this={container}>
    <div id="intro" style="filter: saturate(max(0, calc(1 - {y / window.innerHeight})))">
      <img
        id="quito-2"
        src={'/images/welcomepage/landscape/QUITO_2.png'}
        alt=""
        style="
          transform: translateX({$offset - maxOffset}px);
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="avila"
        src={'/images/welcomepage/landscape/AVILA.png'}
        alt=""
        style="
          transform: translateX(calc({y * 0.2}em + {maxOffset - $offset}px));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="caracas-3"
        src={'/images/welcomepage/landscape/CARACAS_3.png'}
        alt=""
        style="
          transform: translateX(calc({y * 0.2}em + {maxOffset - $offset}px));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="caracas-bldgs"
        src={'/images/welcomepage/landscape/CARACAS_BLDGS.png'}
        alt=""
        style="
          transform: translateX(calc({y * 0.2}em + {500 - $offset}px));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="quito-1"
        src={'/images/welcomepage/landscape/QUITO_1.png'}
        alt=""
        style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="quito-houses"
        src={'/images/welcomepage/landscape/QUITO_HOUSES.png'}
        alt=""
        style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="caracas-2"
        src={'/images/welcomepage/landscape/CARACAS_2.png'}
        alt=""
        style="
          transform: translateX(calc({y * 0.2}em + {500 - $offset}px));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="caracas-1"
        src={'/images/welcomepage/landscape/CARACAS_1.png'}
        alt=""
        style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
      />
      <img
        id="quito-trees"
        src={'/images/welcomepage/landscape/QUITO_TREES.png'}
        alt=""
        style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
      />
    </div>

    <Parallax sections={3}>
      <div id="parallax-container" class="centered-column">
        <ParallaxLayer rate={1} class="centered-column">
          <div style="padding-left:2rem; padding-right:2rem">
            <h1 style="text-align: center;">Vida Migrante</h1>
            <p style="font-size: 21pt; font-weight: 400; line-height: 24pt; text-align: center;">
              {#if language === Languages.ENGLISH}
                Venezuelan Migrants' Inclusion in Ecuador.
              {:else}
                Inclusión de los Migrantes Venezolanos en Ecuador.
              {/if}
            </p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} rate={1} class="centered-column">
          <div style="z-index: 12; padding-left: 2rem; padding-right: 2rem;">
            {#if language == Languages.ENGLISH}
              <h1 style="text-align: center; width: auto;">
                Venezuelan Migrants <br /> in Ecuador
              </h1>
            {:else}
              <h1 style="text-align: center; width: auto;">
                Migrantes Venezolanos <br /> en Ecuador
              </h1>
            {/if}
            <p style="text-align: left; font-family: 'open-sans', sans-serif;">
              {#if language == Languages.ENGLISH}
                When migrants arrive in Ecuador, they face <b>multiple challenges</b>. In this
                simulation, you will learn about the <b>tough decisions</b> migrants have to make in
                Ecuador on a daily basis, <b>how they face them</b>, and how
                <b>assistances are essential</b>
                to help them through their inclusion in Ecuador. <br /><br />All the simulation data
                is based on a survey of
                <b>920 household migrants</b> in Ecuador by the World Food Programme. <br /><br
                />You will embark on a journey in the life of a Venezuelan migrant to experience the
                challenges of integrating into Ecuador.
              {:else}
                Cuando los migrantes llegan a Ecuador enfrentan <b>múltiples desafíos</b>. En esta
                simulación aprenderás sobre lo <b>difícil de las decisiones</b> que diariamente
                toman los migrantes en el Ecuador, <b>cómo las enfrentan </b> y cómo las
                <b>asistencias, son esenciales</b>
                para ayudarlos en su inclusión en el Ecuador. <br /><br />Todos los datos de la
                simulación se basan en una encuesta realizada a
                <b>920 hogares de migrantes</b> en el Ecuador realizada por el Programa Mundial de
                Alimentos. <br /><br />
                Te embarcarás en un viaje en la vida de un migrante venezolano para experimentar la Desafíos
                de la inclusión al Ecuador.
              {/if}
            </p>
          </div>

          {#if language == Languages.ENGLISH}
            <a href="/game" class="button">Start</a>
          {:else}
            <a href="/game" class="button">Empezar</a>
          {/if}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          rate={1}
          class="centered-column"
          style="padding-bottom: max(5.5rem, 100px);"
        >
          <div style="z-index: 12; padding-left:2rem; padding-right:2rem;">
            {#if language == Languages.ENGLISH}
              <h1 style="text-align: center;">How to Play?</h1>
            {:else}
              <h1 style="text-align: center;">¿Cómo jugar?</h1>
            {/if}
            {#if language == Languages.ENGLISH}
              <p style="text-align: left; font-family: 'open-sans', sans-serif;">
                The goal of the game is to <b>improve part of your livelihood;</b> increasing your income
                while working reasonable hours.
              </p>
            {:else}
              <p style="text-align: left; font-family: 'open-sans', sans-serif;">
                El objetivo del juego es <b>mejorar tu sustento;</b> aumentar tus ingresos, trabajando
                horas razonables.
              </p>
            {/if}
            <ol type="1" style="padding-left: 1em;">
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    1. Select a migrant and an occupation. These selection will assign you a
                    specific <b>monthly income and expenses. </b>
                  </p>
                {:else}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    1. Selecciona un migrante y una ocupación. Esta selección te asignará <b
                      >ingresos y gastos mensuales.
                    </b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    2. You will play 4 rounds, each round is <b>one month.</b>
                  </p>
                {:else}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    2. Jugarás 4 rondas, cada ronda representa <b>un mes.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    3. Draw a card for every month. The card contains an event or a situation you
                    <b>have to face through a decision.</b>
                  </p>
                {:else}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    3. Tomarás una tarjeta para cada mes. Cada tarjeta contiene un evento o una
                    situación que debes
                    <b>enfrentar a través de una decisión.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    4. The decision you make will
                    <b>affect your income and your expenses.</b>
                  </p>
                {:else}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    4. La decisión que tomes
                    <b> afectará tus ingresos y tus gastos.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    5. You will have the opportunity to select certain
                    <b>assistance, to help you through your journey.</b>
                  </p>
                {:else}
                  <p style="margin: 0; font-family: 'open-sans', sans-serif;">
                    5. Tendrás la oportunidad de seleccionar algunas
                    <b>asistencias para hacer más llevadera tu experiencia </b>en el Ecuador.
                  </p>
                {/if}
              </li>
            </ol>
          </div>
          <a href="/about">
            {#if language == Languages.ENGLISH}
              About
            {:else}
              Acerca
            {/if}
          </a>
          <a href="/policy">
            {#if language == Languages.ENGLISH}
              Policy Recommendations
            {:else}
              Recomendaciones
            {/if}
          </a>
          <a id="second-button" href="/game" class="button">
            {#if language == Languages.ENGLISH}
              Start
            {:else}
              Empezar
            {/if}
          </a>
        </ParallaxLayer>
      </div>
    </Parallax>
  </div>
{/if}

<footer>
  <span class="logos">
    <img src={mitLogo} alt="MIT Logo" />
    <img
      src={cddlLogo}
      alt="Civic Data Design
    Lab Logo"
    />
    <img
      src={wfpLogo}
      alt="World Food Programme Logo
    (English)"
      style:height="28px"
    />
    <img src={usaidLogo} alt="USAID Logo" style:height="28px" />
  </span>

  {#if container && y < container.scrollHeight - window.innerHeight}
    <img class="arrow-icon" src={arrowIcon} alt="Scroll to see more" />
  {/if}
  <LanguageToggle />
</footer>

<style>
  #container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #intro {
    position: fixed;
    top: 0;
    height: inherit;
    width: inherit;
    background-image: url('/images/welcomepage/landscape/QUITO_BG_VOLCANO.png');
    background-position: 60% 20vh;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #quito-2 {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 200%;
    bottom: -42%;
    right: -80%;
  }

  #avila {
    position: absolute;
    z-index: 3;
    height: 60%;
    width: 250%;
    bottom: -10%;
    right: -50%;
  }

  #caracas-3 {
    position: absolute;
    z-index: 4;
    height: 36%;
    width: 150%;
    bottom: -10%;
    right: -5%;
  }

  #caracas-bldgs {
    position: absolute;
    z-index: 5;
    height: 44%;
    width: 100%;
    bottom: -6%;
    right: 10%;
  }

  #quito-1 {
    position: absolute;
    z-index: 6;
    height: 35%;
    width: 200%;
    left: -5%;
    bottom: -8%;
  }

  #quito-houses {
    position: absolute;
    z-index: 7;
    height: 50%;
    width: 100%;
    bottom: -10%;
    left: 10%;
  }

  #caracas-2 {
    position: absolute;
    z-index: 8;
    height: 60%;
    width: 120%;
    bottom: -20%;
  }

  #caracas-1 {
    position: absolute;
    z-index: 9;
    height: 40%;
    width: 100%;
    bottom: -20%;
    right: 10%;
  }

  #quito-trees {
    position: absolute;
    z-index: 7;
    height: 50%;
    width: 120%;
    bottom: -12%;
    right: -10%;
  }

  #parallax-container {
    height: calc(100 * var(--vh));
    width: calc(100 * var(--vw));
    max-width: min(100vw, 750px);
  }

  #second-button {
    margin-top: 0.5em;
  }

  .arrow-icon {
    height: 8px;
    color: #505050;
    display: flex;
    animation-name: flash;
    animation: blinker 2s linear infinite;
  }

  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;

    padding: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .logos {
    max-width: calc(45 * var(--vw));

    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .logos img {
    height: 20px;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>
