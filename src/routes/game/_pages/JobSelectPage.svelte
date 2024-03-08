<script>
  import { GameData } from '$gameData';
  import Modal from '$components/Modal.svelte';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';
  import LearnMore from '$components/LearnMore.svelte';

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
  {#if language === Languages.ENGLISH}Choose your occupation{:else}Selecciona una ocupación{/if}
</h1>
<p style="width: 85%; word-wrap: break-word;margin-block:.25em; text-align:center">
  {#if language === Languages.ENGLISH}Migrants have limited options to get a job.{:else}Los
    migrantes tienen opciones limitadas para encontrar empleo.{/if}
</p>
<LearnMore>
  <h1 slot="title">
    {#if language === Languages.ENGLISH}
      Occupations
    {:else}
      Ocupaciones
    {/if}
  </h1>
  <p slot="body">
    {#if language === Languages.ENGLISH}
      These are the most common occupations of migrants from our survey. Our findings reveal that
      migrants have no choice but to transition to the informal sector in Ecuador. According to
      Ecuador's Ministry of Employment, 51% of the Ecuadorian economy is in the informal sector, 82%
      of migrants are in the informal sector. Other common occupations of migrants are
      non-specialized personal services and the food and beverages industry.
    {:else}
      Estas son las ocupaciones más comunes de los migrantes según nuestra encuesta. Nuestros
      hallazgos revelan que los migrantes no tienen más remedio que hacer la transición al sector
      informal en Ecuador. Según el Ministerio de Trabajo de Ecuador, el 51% de la economía
      ecuatoriana se encuentra en el sector informal, el 82% de la población migrante se encuentra
      en la informalidad. Otras ocupaciones comunes entre los migrantes son los servicios personales
      no especializados y la industria de alimentos y bebidas.
    {/if}
  </p>
</LearnMore>
<div id="jobs">
  {#each jobs as job, i}
    <div class="centered-column">
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
      <p style="margin: 0; margin-top: 5px; text-align: center">{job.title}</p>
    </div>
  {/each}
</div>
<Modal bind:showModal>
  <div id="modal-body" slot="body">
    <img id="modal-img" src={modalImgSrc} alt={modalSector} />
    <h1 id="modal-title">{modalTitle}</h1>
    <p id="modal-text">
      {#if language === Languages.ENGLISH}
        <b>{modalDemo}</b> of migrants work in the <b>{modalSector}</b> sector in Ecuador. Your
        monthly income will be <b>${modalIncome}</b> and you will be working an average of
        <b>{modalHours} hours</b> per week.
      {:else}
        <b>{modalDemo}</b> de los migrantes trabaja en el sector de <b>{modalSector}</b> en Ecuador.
        Tu ingreso mensual será de <b>${modalIncome}</b> y trabajarás un promedio de
        <b>{modalHours} horas</b> por semana.
      {/if}
    </p>
    <button
      id="modal-button"
      class="button"
      disabled={buttonDisabled || $GameData.prevJob === job}
      on:click={() => {
        GameData.advanceGameState({ jobId: job });
      }}
    >
      {#if buttonDisabled}
        {#if language === Languages.ENGLISH}
          <span>You don't have the required accreditations</span>
        {:else}
          <span>No tienes las acreditaciones necesarias</span>
        {/if}
      {:else if language === Languages.ENGLISH}
        {#if $GameData.prevJob === job}
          You quit this job
        {:else}
          Select
        {/if}
      {:else if $GameData.prevJob === job}
        Dejaste este trabajo
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
    column-gap: 15vw;
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

  @media only screen and (max-width: 450px) {
    #jobs {
      column-gap: 5vw;
    }
  }

  @media only screen and (max-height: 700px) {
    h1 {
      font-size: 23pt;
    }

    p {
      font-size: 12pt;
    }

    .centered-column > p {
      font-size: 11pt;
    }
  }
</style>
