<script>
  import { GameData } from '$gameData';
  import Modal from '$components/Modal.svelte';
  import { page } from '$app/stores';

  $: jobs = $page.data.jobsData.jobs;

  let job = 0;
  let showModal = false;
  let modalImgSrc, modalTitle, modalDemo, modalSector, modalIncome, modalHours, buttonDisabled;
  function modalUpdater(imgSrc, title, demo, sector, income, hours, jobId, button) {
    return function updater() {
      modalImgSrc = imgSrc;
      modalTitle = title;
      modalDemo = demo;
      modalSector = sector;
      modalIncome = income;
      modalHours = hours;
      showModal = true;
      job = jobId;
      buttonDisabled = button;
    };
  }
</script>

<h1
  style="width: 200px;
word-wrap: break-word;"
>
  Choose your occupation
</h1>
<div id="jobs">
  {#each jobs as job, i}
    <img
      class="selection-icon"
      src={`/images/jobs/${job.image}`}
      alt={job.sector}
      on:click={modalUpdater(
        `/images/jobs/${job.image}`,
        job.title,
        job.demographics,
        job.sector,
        job.income,
        job.hours,
        i,
        job.disabled
      )}
    />
  {/each}
</div>
<Modal bind:showModal>
  <div id="modal-body" slot="body">
    <img id="modal-img" src={modalImgSrc} alt={modalSector} />
    <b id="modal-title">{modalTitle}</b>
    <p id="modal-text">
      <b>{modalDemo}</b> of Venezuelans work in the <b>{modalSector}</b> sector in Ecuador. Your
      monthly income will be <b>${modalIncome}</b> and you will be working an average of
      <b>{modalHours} hours</b> per week.
    </p>
    <button
      id="modal-button"
      class="button"
      disabled={buttonDisabled}
      on:click={() => {
        GameData.advanceGameState({ jobId: job });
      }}
    >
      {#if buttonDisabled}
        <span>You don't have the required accreditations</span>
      {:else}
        Select
      {/if}
    </button>
  </div>
</Modal>

<style>
  h2 {
    position: fixed;
    top: 3vh;
    text-align: center;
  }

  #jobs {
    margin-top: 15vh;
    height: 85vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30vw;
  }

  .selection-icon {
    height: 10vh;
  }

  #modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  #modal-img {
    height: 20vh;
  }

  #modal-title {
    font-family: 'sirenia', sans-serif;
    color: #505050;
    margin-block: 3vh;
  }

  #modal-text {
    margin-top: 0;
    margin-bottom: 12vh;
  }

  #modal-button {
    height: 5vh;
    width: 50%;
    border-radius: 2.5vh;
    font: 18pt 'sirenia';
  }

  #modal-button:disabled {
    height: 10%;
    width: 65%;
    inline-size: 350px;
  }

  span {
    font-size: 15pt;
  }
</style>
