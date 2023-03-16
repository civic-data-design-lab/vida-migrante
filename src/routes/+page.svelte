<script>
  import { fade, fly } from 'svelte/transition';
  // import AVILA from '../../static/images/welcomepage/landscape/AVILA.png';

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
    <h1>Welcome</h1>
    <p>We will take you through the journey and struggles of Venezuelan migrants in Ecuador</p>
  {:else if page === 1}
    <p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>
    <img
      src={'/images/welcomepage/landscape/AVILA.png'}
      alt=""
      in:fly={{ x: 200, duration: 2000 }}
      out:fade
    />

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
    <button class="button button" on:click={advancePage}> Next </button>
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
