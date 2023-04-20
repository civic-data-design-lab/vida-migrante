<script>
  import { GameData } from '$gameData';
  import Modal from '$components/Modal.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  $: language = $page.data.language;
  const jobs = $page.data.jobsData.jobs;

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

<h1 style="width: 95%; word-wrap: break-word;margin-bottom:.2em;">
  {#if language == Languages.ENGLISH}Choose your occupation{:else}Selecciona una ocupación{/if}
</h1>
<p style="width: 80%; word-wrap: break-word;margin-top:.1em; text-align:center">
  {#if language == Languages.ENGLISH}Migrants have limited options to get a job.{:else}Los migrantes
    tienen opciones limitadas para encontrar empleo.{/if}
</p>
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
    <h1 id="modal-title">{modalTitle}</h1>
    {#if language == Languages.ENGLISH}
      <p id="modal-text">
        <b>{modalDemo}</b> of migrants work in the <b>{modalSector}</b> sector in Ecuador. Your
        monthly income will be <b>${modalIncome}</b> and you will be working an average of
        <b>{modalHours} hours</b> per week.
      </p>
    {:else}
      <p id="modal-text">
        <b>{modalDemo}</b> de los migrantes trabaja en el sector de <b>{modalSector}</b> en Ecuador.
        Tu ingreso mensual será de <b>${modalIncome}</b> y trabajarás un promedio de
        <b>{modalHours} horas</b> por semana.
      </p>{/if}
    <button
      id="modal-button"
      class="button"
      disabled={buttonDisabled}
      on:click={() => {
        GameData.advanceGameState({ jobId: job });
      }}
    >
      {#if buttonDisabled}
        {#if language == Languages.ENGLISH}
          <span>You don't have the required accreditations</span>
        {:else}
          <span>No tienes las acreditaciones necesarisas</span>
        {/if}
      {:else if language == Languages.ENGLISH}
        Select
      {:else}
        Seleccionar
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
    margin-top: 1em;
    height: 85vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30vw;
    overflow-y: hidden;
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
    margin-bottom: 2em;
  }

  #modal-button {
    height: 5vh;
    width: 50%;
    border-radius: 2.5vh;
    transition: none;
  }

  #modal-button:disabled {
    height: 10%;
    width: 65%;
    inline-size: 80%;
  }

  span {
    font-size: 14pt;
  }
</style>
