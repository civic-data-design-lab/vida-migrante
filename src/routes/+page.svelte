<script>
  import { Languages } from '$lib/utils/types';
  import { fade, fly } from 'svelte/transition';
  import { Parallax, ParallaxLayer } from 'svelte-parallax';
  import { onMount } from 'svelte';
  import arrowIcon from '$images/keyboard-arrow-down_119013.svg';

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
          <div style="z-index: 11; ">
            <span style="display: flex;">
              <!-- svelte-ignore a11y-missing-attribute -->
              <img class="arrowicon" src={arrowIcon} />
            </span>
          </div>
          <div style="padding-left:2rem; padding-right:2rem">
            <h1 style="text-align: center;">Vida Migrante</h1>
            <p style="font-size:21pt; font-weight:400: line-height:24pt;text-align: center;">
              {#if language == Languages.ENGLISH}
                Venezuelan Migrants' Integration in Ecuador.
              {:else}
                Integración de los Migrantes Venezolanos en Ecuador.
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
          <div style="z-index: 12; padding-left:2rem; padding-right:2rem;">
            <h1 style="text-align: center;">Venezuelan Migrants <br /> in Ecuador</h1>
            <p style="text-align: left;">
              When migrants arrive in Ecuador, they face <b>multiple challenges</b>. In this
              simulation, you will learn about the <b>tough decisions</b> migrants have to make in
              Ecuador on a daily basis, <b>how they face them</b>, and how
              <b>assistances are essential</b>
              to help them through their integration in Ecuador. <br /><br />All the simulation data
              is based on a survey of
              <b>920 household migrants</b> in Ecuador by the World Food Programme. <br /><br />You
              will embark on a journey in the life of a Venezuelan migrant to experience the
              challenges of integrating into Ecuador.
            </p>
          </div>

          <a href="/game" class="button">Start</a>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          rate={1}
          style="
        background-color: #f6e0b1; 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        flex-direction: column;
      "
        >
          <div style="z-index: 12; padding-left:2rem; padding-right:2rem">
            <h1 style="text-align: center;">How to Play?</h1>
            <p style="text-align: left;">
              The goal of the game is to <b>improve part of your livelihood;</b> increasing your income
              while working reasonable hours.
            </p>
            <ol type="1" style="padding-left: 1em;">
              <li>
                <p style="margin: 0;">
                  1. Select a migrant and an occupation. These selection will assign you a specific <b
                    >monthly income and expenses.
                  </b>
                </p>
              </li>
              <li>
                <p style="margin: 0;">
                  2. You will play 4 rounds, each round is<b>one month.</b>
                </p>
              </li>
              <li>
                <p style="margin: 0;">
                  3. Draw a card for every month. The card contains an event or a situation you
                  <b>have to face through a decision.</b>
                </p>
              </li>
              <li>
                <p style="margin: 0;">
                  4. The decision you make will
                  <b>affect your income and your expenses.</b>
                </p>
              </li>
              <li>
                <p style="margin: 0;">
                  5. You will have the opportunity to select certain
                  <b>assistance, to help you through your journey.</b>
                </p>
              </li>
            </ol>
          </div>
          <a href="/about">About</a>
          <a href="/policy">Policy Recommendations</a>
          <br />
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
  .arrowicon {
    height: 8px;
    color: #505050;
    display: flex;
    justify-content: center;
    z-index: 13;
    position: absolute;
    bottom: 5%;
  }
</style>
