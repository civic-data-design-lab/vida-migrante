<script>
  import { Languages } from '$lib/utils/types';
  import { fade, fly } from 'svelte/transition';
  import { Parallax, ParallaxLayer } from 'svelte-parallax';
  import { onMount } from 'svelte';

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

<Parallax sections={3} bind:this={parallax}>
  <div id="container" style="background-color: white;">
    {#if !page && ready}
      <ParallaxLayer style="background-color: white;">
        <img
          src={'/images/welcomepage/landscape/QUITO_BG_VOLCANO.png'}
          alt=""
          style="transform: translate(0,{(-y * 10) /
            (layers.length -
              1)}px); position: absolute; z-index: 1; height: 100%; width: 120%; bottom: -20%; left: -10%;"
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_2.png'}
          alt=""
          style="transform: translate(0,{(-y * 9) /
            (layers.length -
              1)}px); position: absolute; z-index: 2; height: 100%; width: 200%; bottom: -42%; right: -80%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/AVILA.png'}
          alt=""
          style="transform: translate(0,{(-y * 8) /
            (layers.length -
              1)}px); position: absolute; z-index:3; height:60%; width: 250%; bottom: -10%; right: -50%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_3.png'}
          alt=""
          style="transform: translate(0,{(-y * 7) /
            (layers.length -
              1)}px); position: absolute; z-index: 4; height: 36%; width: 150%; bottom: -10%; right: -5%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_BLDGA.png'}
          alt=""
          style="transform: translate(0,{(-y * 6.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 5; height: 44%; width: 100%; bottom: -6%; right: 10%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_1.png'}
          alt=""
          style="transform: translate(0,{(-y * 6) /
            (layers.length -
              1)}px); position: absolute; z-index: 6; height: 35%; width: 200%; left: -5%; bottom: -8%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_HOUSES.png'}
          alt=""
          style="transform: translate(0,{(-y * 5.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 7; height: 50%; width: 100%; bottom: -10%; left: 10%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_2.png'}
          alt=""
          style="transform: translate(0,{(-y * 5) /
            (layers.length -
              1)}px); position: absolute; z-index: 8; height: 60%; width: 120%; bottom: -20%;"
          in:fly={{ x: 500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/CARACAS_1.png'}
          alt=""
          style="transform: translate(0,{(-y * 4.5) /
            (layers.length -
              1)}px); position: absolute; z-index: 9; height: 40%; width: 100%; bottom: -20%; right: 10%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <img
          src={'/images/welcomepage/landscape/QUITO_TREES.png'}
          alt=""
          style="transform: translate(0,{(-y * 4) /
            (layers.length -
              1)}px); position: absolute; z-index: 10; height: 50%; width: 120%; bottom: -12%;"
          in:fly={{ x: -500, duration: 6000 }}
        />
        <div style="z-index: 11;">
          <span style="display: flex; justify-content: center; opacity: {1 - Math.max(0, y / 40)}">
            scroll down
          </span>
        </div>
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
          <div style="">
            <h1 style="">Vida Migrante</h1>
            <p style="">
              {#if language == Languages.ENGLISH}
                You will embark on a journey in the life of a Venezuelan migrant to experience the
                challenges of integrating into Ecuador.
              {:else}
                Te embarcarás en un viaje en la vida de un migrante Venezolano y experimentarás los
                desafíos de integrarse a Ecuador.
              {/if}
            </p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          rate={1}
          style="
        <!-- background: url('images/welcomepage/background-mountains.png') no-repeat center center fixed;  -->
        width: 100%;
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="z-index: 12;">
            <p>When migrants arrive in Ecuador, they face multiple challenges including:</p>
            <ol>
              <li>Barriers to integration for migrants</li>
              <li>Trade-offs the migrants have to make to meet their basic daily needs</li>
              <li>
                How support and assistances (food, access to internet, and legalization of
                documents) can help change migrants' outcomes
              </li>
            </ol>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          rate={1}
          style="
        background-color: lightblue; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="z-index: 12;">
            <p>
              In this game you will learn about the struggles of the Venezuelan migrants in Ecuador,
              how they face them, and how certain assistances can help them through their
              integration process in Ecuador.
            </p>
            <p>
              The goal of them game is to go through each one of the four rounds, which is an entire
              year, by using as few coping strategies as possible, while maintaining some money,
              time, and wellness.
            </p>
          </div>
          <a href="/game" class="button">Start</a>
        </ParallaxLayer>
      </div>
    {:else if page === 1}
      <p>When migrants arrive in Ecuador, they face multiple challenges including:</p>
      <ol>
        <li>Barriers to integration for migrants</li>
        <li>Trade-offs the migrants have to make to meet their basic daily needs</li>
        <li>
          How support and assistances (food, access to internet, and legalization of documents) can
          help change migrants' outcomes
        </li>
      </ol>
    {:else if page === 2}
      <p>
        In this game you will learn about the struggles of the Venezuelan migrants in Ecuador, how
        they face them, and how certain assistances can help them through their integration process
        in Ecuador.
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
</style>
