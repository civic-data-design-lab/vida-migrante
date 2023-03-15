<script>
  import { fade, fly } from 'svelte/transition';

  const lastPage = 2;
  let page = 0;
  function advancePage() {
    if (page === lastPage) window.location.href = '/game';
    else page++;
    visible = true;
  }
  let visible=false;
</script>

<div id="container">
  {#if !page}
    <h1>Welcome</h1>
    <p>We will take you through the journey and struggles of Venezuelan migrants in Ecuador</p>
  {:else if page === 1}
    <p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
      Flies in, fades out
    </p>
    <svg xmlns="/images/welcomepage/QUITO_BG_VOLCANO.svg" viewBox="0 0 1150 700">
      <g>
        <title>WOah an image</title>
        <path in:fly={{ y: 150, delay: 1450, duration: 600}} class="st0" d="M890.55,542c-210.18,0-420.36,0-630.55,0c0-128,0-256,0-384c210.18,0,420.36,0,630.55,0
        C890.55,286,890.55,414,890.55,542z M878.63,209.8c-2.03,0.72-3.56,1.04-4.87,1.76c-5.18,2.85-8.72,8.67-15.94,7.83
        c-4.73-0.55-9.58,0.02-14.38-0.03c-3.56-0.03-7.2-0.76-10.65-0.23c-3.49,0.54-6.15,0.35-8.35-2.65c-0.49-0.66-1.72-1.26-2.51-1.15
        c-8.55,1.17-17.05,2.64-25.61,3.66c-3.03,0.36-6.19-0.24-9.29-0.47c-4.49-0.33-8.97-0.7-13.45-1.11c-4.34-0.4-9,0-12.96-1.47
        c-10.8-4.01-22.01-5.43-33.29-6.7c-6.99-0.79-14.04-1-21.02-1.78c-2.25-0.25-4.52-1.27-6.53-2.38c-4.3-2.38-8.46-4.96-13.66-4.6
        c-3.08,0.21-5.51-0.93-7.78-3.09c-3.24-3.08-6.43-6.34-11.71-5.77c-1.52,0.16-3.43-1.14-4.8-2.23c-3.23-2.56-6.13-5.54-9.38-8.07
        c-5.18-4.03-10.78-6.91-17.74-5.94c-2.83,0.39-5.76,0.35-8.63,0.22c-4.06-0.18-7.87-0.12-9.79,4.38c-0.2,0.47-0.68,0.84-1.09,1.19
        c-2.38,2.07-4.76,4.15-7.18,6.18c-3.15,2.64-6.01,5.67-10.56,6.11c-2.18,0.21-4.47,0.97-6.36,2.07
        c-5.12,2.98-11.18,4.41-15.29,9.12c-0.68,0.78-1.78,1.24-2.76,1.7c-10.13,4.87-20.97,7.78-31.57,11.37
        c-3.48,1.18-7.02,2.2-10.58,3.07c-0.9,0.22-2.34-0.08-2.95-0.7c-3.15-3.2-6.63-5.01-11.29-4.11c-5.17,1.01-10.12,3.21-15.63,2.55
        c-2.55-0.31-5.21,0.36-7.82,0.41c-1.89,0.04-3.8-0.08-5.66-0.35c-6.04-0.86-12.02-1.56-17.78,1.39c-1.25,0.64-2.72,1.03-4.12,1.15
        c-5.48,0.46-10.98,0.74-16.47,1.13c-7.15,0.51-13.92,2.54-20.09,6.06c-3.49,1.99-7.07,3.14-10.92,3.69
        c-2.58,0.37-5.33,0.07-7.79,0.79c-3.76,1.11-7.23,1.02-10.85-0.39c-1.64-0.64-3.53-0.63-5.31-0.9c-3.81-0.58-7.58-0.88-11.23-2.67
        c-5.25-2.57-10.85-3.92-16.81-1.84c-1.24,0.43-2.87-0.25-4.32-0.41c-2.1-0.23-4.2-0.5-6.3-0.65c-1.88-0.13-3.79,0.02-5.66-0.19
        c-5.08-0.56-10.15-1.22-15.22-1.87c-3.83-0.49-7.66-0.95-11.47-1.58c-2.48-0.41-4.91-1.15-7.38-1.67
        c-3.07-0.64-6.13-1.37-9.23-1.75c-2.88-0.36-5.81-0.29-8.71-0.44c-2-0.1-4.01-0.13-5.98-0.44c-2.55-0.4-5.05-1.44-7.59-1.47
        c-2.35-0.03-4.72,0.89-7.07,1.41c-1.41,0.31-2.75,1.04-1.43,2.5c1.59,1.76,1.01,3.37,0.55,5.2c-0.33,1.3-0.54,2.67-0.54,4
        c-0.02,95.77-0.01,191.55-0.07,287.32c0,2.63,0.71,3.31,3.32,3.31c198.92-0.06,397.83-0.06,596.75,0c2.6,0,3.33-0.65,3.33-3.29
        c-0.07-90.51-0.06-181.01-0.06-271.52c0-0.9-0.12-1.8-0.14-2.71c-0.12-5.52-0.26-11.03-0.31-16.55
        C878.59,221.01,878.63,215.82,878.63,209.8z">
      </g>
    </svg>
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
