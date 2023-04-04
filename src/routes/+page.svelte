<script>
  import { Languages } from '$lib/utils/types';
  import { fade, fly } from 'svelte/transition';
  import { Parallax, ParallaxLayer } from 'svelte-parallax';
  import { onMount } from 'svelte';
  import arrowIcon from '$images/keyboard-arrow-down_119013.svg';
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';
  import cddlLogo from '$images/cddl_logo_black.svg';
  import mitLogo from '$images/mit-logo-black-blue.png';
  import wfpLogo from '$images/wfp-logo-standard-white-en.svg';

  /** Page data loaded from `+layout.server.svelte` */
  export let data;

  const lastPage = 2;
  let page = 0;
  function advancePage() {
    if (page === lastPage) window.location.href = '/game';
    else page++;
  }

  //for transition
  let ready = false;
  onMount(() => (ready = true));

  $: language = data.language;

  //for scrolling
  let y;
  let layer;
  const layers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let parallax;
</script>

<svelte:window bind:scrollY={y} />

<footer>
  <span class="logos">
    <img src={mitLogo} alt="MIT Logo" />
    <img
      src={cddlLogo}
      alt="Civic Data Design
    Lab Logo"
    />
    <img style="height:28px" src={wfpLogo} alt="World Food Programme Logo (English)" />
  </span>
  <img class="arrowicon" src={arrowIcon} alt="Scroll to see more" />
  <LanguageToggle />
</footer>

<Parallax sections={3} bind:this={parallax}>
  <div id="container" style="background-color: white;">
    {#if !page && ready}
      <ParallaxLayer style="background-color: white;">
        <img
          src={'/images/welcomepage/landscape/QUITO_BG_VOLCANO.png'}
          alt=""
          style="transform: translate(0em,{(-y * 10) /
            (layers.length -
              1)}px); position: absolute; z-index: 1; height: 100%; width: 120%; bottom: -20%; left: -10%;"
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_2.png'}
          alt=""
          style="transform: translate({-y * 0.2}em,{(-y * 9) /
            (layers.length -
              1)}px); position: absolute; z-index: 2; height: 100%; width: 200%; bottom: -42%; right: -80%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/AVILA.png'}
          alt=""
          style="transform: translate({y * 0.2}em,{(-y * 8) /
            (layers.length -
              1)}px); position: absolute; z-index:3; height:60%; width: 250%; bottom: -10%; right: -50%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_3.png'}
          alt=""
          style="transform: translate({y * 0.2}em,{(-y * 7) /
            (layers.length -
              1)}px); position: absolute; z-index: 4; height: 36%; width: 150%; bottom: -10%; right: -5%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_BLDGA.png'}
          alt=""
          style="transform: translate({y * 0.2}em,{(-y * 6.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 5; height: 44%; width: 100%; bottom: -6%; right: 10%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_1.png'}
          alt=""
          style="transform: translate({-y * 0.2}em,{(-y * 6) /
            (layers.length -
              1)}px); position: absolute; z-index: 6; height: 35%; width: 200%; left: -5%; bottom: -8%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_HOUSES.png'}
          alt=""
          style="transform: translate({-y * 0.2}em,{(-y * 5.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 7; height: 50%; width: 100%; bottom: -10%; left: 10%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_2.png'}
          alt=""
          style="transform: translate({y * 0.2}em,{(-y * 5) /
            (layers.length -
              1)}px); position: absolute; z-index: 8; height: 60%; width: 120%; bottom: -20%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_1.png'}
          alt=""
          style="transform: translate({-y * 0.2}em,{(-y * 4.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 9; height: 40%; width: 100%; bottom: -20%; right: 10%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_TREES.png'}
          alt=""
          style="transform: translate({-y * 0.2}em,{(-y * 4) /
            (layers.length -
              1)}px); position: absolute; z-index: 10; height: 50%; width: 120%; bottom: -12%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
      </ParallaxLayer>
      <div
        style="
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 12;"
      >
        <ParallaxLayer
          offset={0}
          rate={1}
          style="
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="padding-left:2rem; padding-right:2rem">
            <h1 style="text-align: center;">Vida Migrante</h1>
            <p style="font-size:21pt; font-weight:400: line-height:24pt;text-align: center;">
              {#if language == Languages.ENGLISH}
                Venezuelan Migrants' Inclusion in Ecuador.
              {:else}
                Inclusión de los Migrantes Venezolanos en Ecuador.
              {/if}
            </p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          rate={1}
          style="
        <!-- background: url('images/welcomepage/background-mountains.png') no-repeat center center fixed;  -->
        background-color: #f6e0b1;
        width: 100%;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="z-index: 12; padding-left:2rem; padding-right:2rem;">
            {#if language == Languages.ENGLISH}
              <h1 style="text-align: center; width: auto;">
                Venezuelan Migrants <br /> in Ecuador
              </h1>
            {:else}
              <h1 style="text-align: center; width: auto;">
                Migrantes Venezolanos <br /> en Ecuador
              </h1>
            {/if}
            <p style="text-align: left;">
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
          style="
        background-color: 0; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="z-index: 12; padding-left:2rem; padding-right:2rem">
            {#if language == Languages.ENGLISH}
              <h1 style="text-align: center;">How to Play?</h1>
            {:else}
              <h1 style="text-align: center;">¿Cómo jugar?</h1>
            {/if}
            {#if language == Languages.ENGLISH}
              <p style="text-align: left;">
                The goal of the game is to <b>improve part of your livelihood;</b> increasing your income
                while working reasonable hours.
              </p>
            {:else}
              <p style="text-align: left;">
                El objetivo del juego es <b>mejorar tu sustento;</b> aumentar tus ingresos, trabajando
                horas razonables.
              </p>
            {/if}
            <ol type="1" style="padding-left: 1em;">
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0;">
                    1. Select a migrant and an occupation. These selection will assign you a
                    specific <b>monthly income and expenses. </b>
                  </p>
                {:else}
                  <p style="margin: 0;">
                    1. Selecciona un migrante y una ocupación. Esta selección te asignará <b
                      >ingresos y gastos mensuales.
                    </b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0;">
                    2. You will play 4 rounds, each round is <b>one month.</b>
                  </p>
                {:else}
                  <p style="margin: 0;">
                    2. Jugarás 4 rondas, cada ronda representa <b>un mes.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0;">
                    3. Draw a card for every month. The card contains an event or a situation you
                    <b>have to face through a decision.</b>
                  </p>
                {:else}
                  <p style="margin: 0;">
                    3. Tomarás una tarjeta para cada mes. Cada tarjeta contiene un evento o una
                    situación que debes
                    <b>enfrentar a través de una decisión.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0;">
                    4. The decision you make will
                    <b>affect your income and your expenses.</b>
                  </p>
                {:else}
                  <p style="margin: 0;">
                    4. La decisión que tomes
                    <b> afectará tus ingresos y tus gastos.</b>
                  </p>
                {/if}
              </li>
              <li>
                {#if language == Languages.ENGLISH}
                  <p style="margin: 0;">
                    5. You will have the opportunity to select certain
                    <b>assistance, to help you through your journey.</b>
                  </p>
                {:else}
                  <p style="margin: 0;">
                    5. Tendrás la oportunidad de seleccionar algunas
                    <b>asistencias para hacer más llevadera tu experiencia </b>en el Ecuador.
                  </p>
                {/if}
              </li>
            </ol>
          </div>
          {#if language == Languages.ENGLISH}
            <a href="/about">About</a>
          {:else}
            <a href="/about">Acerca</a>
          {/if}
          {#if language == Languages.ENGLISH}
            <a href="/policy">Policy Recommendations</a>
          {:else}
            <a href="/policy">Recomendaciones</a>
          {/if}
          <br />
          {#if language == Languages.ENGLISH}
            <a href="/game" class="button">Start</a>
          {:else}
            <a href="/game" class="button">Empezar</a>
          {/if}
        </ParallaxLayer>
      </div>
    {:else if page === 1}
      <p>When migrants arrive in Ecuador, they face multiple challenges including:</p>
      <ol>
        <li>Barriers to inclusion for migrants</li>
        <li>Trade-offs the migrants have to make to meet their basic daily needs</li>
        <li>
          How support and assistances (food, access to internet, and legalization of documents) can
          help change migrants' outcomes
        </li>
      </ol>
    {:else if page === 2}
      <p>
        In this game you will learn about the struggles of the Venezuelan migrants in Ecuador, how
        they face them, and how certain assistances can help them through their inclusion process in
        Ecuador.
      </p>
      <p>
        The goal of them game is to go through each one of the four rounds, which is an entire year,
        by using as few coping strategies as possible, while maintaining some money, time, and
        wellness.
      </p>
    {/if}
    {#if page === lastPage}
      <!-- <a href="/game" class="button">Start</a> -->
    {:else}
      <!-- <button style="z-index: 11;" class="button button" on:click={advancePage}> Next </button> -->
    {/if}
  </div>
</Parallax>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2.5vw;
  }

  .arrowicon {
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
    align-items: baseline;
  }

  .logos {
    display: flex;
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
