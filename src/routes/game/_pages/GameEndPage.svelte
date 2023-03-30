<script>
  import { GameData } from '$gameData';
  import { GameStates, Languages } from '$types';
  import Modal from '$components/Modal.svelte';
  import { jobs } from '$gameFiles/jobs.json';

  $: job = jobs[$GameData.jobId];
  let income = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;

  let showModal = false;
  let success = true;
  function toggle() {
    success = !success;
  }
</script>

<h1>
  Your household is {#if success}doing better!{:else}still struggling{/if}
</h1>
<Modal bind:showModal={showModal}>
  <div id="modal-body" slot="body">
    <h1>
      You and your family are {#if success}doing better!{:else}still struggling{/if}
    </h1>
    <p>
      Your income went from <b>${job.income}</b> to <b class="accent-green">${income}</b>. Your
      household income is still below
      <b class="accent-red">$793, the National Average in Ecuador</b>{#if success}.{:else},
      and it's still not enough to provide for your family's basic needs,
      including the <b>Family Baskets</b> of food.{/if}
    </p>
    {#if success}
      <p>
        Your income is still not enough to buy a <b class="accent-yellow">Basic Family Basket</b> of
        food, but you can afford a <b class="accent-blue">Vital Family Basket</b>.
      </p>
    {/if}
    <p>
      You work {job.hours} hours every week.
    </p>
    <button
      id="modal-button"
      class="button"
      on:click={() => {
        showModal = false;
      }}>OK</button
    >
  </div>
</Modal>

<div id="footer">
  <button on:click={toggle}>Toggle Success</button>
  <button
    on:click={() => {
      showModal = true;
    }}>Show Modal</button
  >
  <button class="button" on:click={GameData.advanceGameState}> Try Again </button>
  <a href="/about">About</a>
  <a href="/policy">Policy Recommendations</a>
</div>

<style>
  h1 {
    text-align: center;
    font-size: min(43pt, 12vw);
    padding-left: 2.5vw;
    padding-right: 2.5vw;
  }
  #footer {
    height: 15vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .button {
    height: 6vh;
    width: 50%;
    border-radius: 3vh;
    font-size: 18pt;
  }

  #modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  #modal-button {
    height: 5vh;
    width: 50%;
    border-radius: 2.5vh;
  }
</style>
