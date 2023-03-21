<script>
  import { fade, fly } from 'svelte/transition';

  const lastPage = 2;
  let page = 0;
  function advancePage() {
    if (page === lastPage) window.location.href = '/game';
    else page++;
    visible = true;
  }
  let visible = false;
</script>

<div id="container">
  {#if !page}
    <h1 style="">Welcome</h1>
    <p style="">
      We will take you through the journey and struggles of Venezuelan migrants in Ecuador
    </p>
  {:else if page === 1}
    <img
      src={'/images/welcomepage/landscape/QUITO_BG_VOLCANO.png'}
      alt=""
      style="position: absolute; z-index: 1; height: 100%; width: 120%; bottom: -20%;"
      out:fly={{ x: 500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/QUITO_2.png'}
      alt=""
      style="position: absolute; z-index: 2; height: 100%; width: 200%; bottom: -42%; right: -80%;"
      in:fly={{ x: -500, duration: 6000 }}
      out:fly={{ x: 500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/AVILA.png'}
      alt=""
      style="position: absolute; z-index:3; height:60%; width: 250%; bottom: -10%; right: -50%;"
      in:fly={{ x: 500, duration: 6000 }}
      out:fly={{ x: -500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/CARACAS_3.png'}
      alt=""
      style="position: absolute; z-index: 4; height: 36%; width: 150%; bottom: -10%; right: -5%;"
      in:fly={{ x: 500, duration: 6000 }}
      out:fly={{ x: -500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/CARACAS_BLDGA.png'}
      alt=""
      style="position: absolute; z-index: 5; height: 44%; width: 100%; bottom: -6%; right: 10%;"
      in:fly={{ x: 500, duration: 6000 }}
      out:fly={{ x: -500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/QUITO_1.png'}
      alt=""
      style="position: absolute; z-index: 6; height: 35%; width: 200%; left: -5%; bottom: -8%;"
      in:fly={{ x: -500, duration: 6000 }}
      out:fly={{ x: 500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/QUITO_HOUSES.png'}
      alt=""
      style="position: absolute; z-index: 7; height: 50%; width: 100%; bottom: -10%; left: 10%;"
      in:fly={{ x: -500, duration: 6000 }}
      out:fly={{ x: 500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/CARACAS_2.png'}
      alt=""
      style="position: absolute; z-index: 8; height: 60%; width: 120%; bottom: -20%;"
      in:fly={{ x: 500, duration: 6000 }}
      out:fly={{ x: -500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/CARACAS_1.png'}
      alt=""
      style="position: absolute; z-index: 9; height: 40%; width: 100%; bottom: -20%; right: 10%;"
      in:fly={{ x: -500, duration: 6000 }}
      out:fly={{ x: 500, duration: 2000 }}
    />
    <img
      src={'/images/welcomepage/landscape/QUITO_TREES.png'}
      alt=""
      style="position: absolute; z-index: 10; height: 50%; width: 120%; bottom: -12%;"
      in:fly={{ x: -500, duration: 6000 }}
      out:fly={{ x: 500, duration: 2000 }}
    />

    <p style="z-index: 11;" out:fly={{ x: 200, duration: 2000 }}>
      When migrants arrive in Ecuador, they face multiple challenges including:
    </p>
    <ol style="z-index: 11;" out:fly={{ x: 200, duration: 2000 }}>
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
      they face them, and how certain assistances can help them through their integration process in
      Ecuador.
    </p>
    <p>
      The goal of them game is to go through each one of the four rounds, which is an entire year,
      by using as few coping strategies as possible, while maintaining some money, time, and
      wellness.
    </p>
  {/if}

  {#if page === lastPage}
    <a href="/game" class="button">Start</a>
  {:else}
    <button style="z-index: 11;" class="button button" on:click={advancePage}> Next </button>
  {/if}
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 2.5vw;
  }

  /* a {
    color: black;
    margin: auto;
    position: fixed;
    bottom: 7vh;
  } */
</style>
