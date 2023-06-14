<script>
  import Modal from '$lib/components/Modal.svelte';
  import { GameData } from '$lib/stores/gameData';
  import { page } from '$app/stores';
  import { DRAWER_ANIM_DURATION, Languages } from '$lib/utils/types';
  import LearnMore from '$components/LearnMore.svelte';

  export let toggleDrawer;

  // Get the page data
  $: language = $page.data.language;
  const assistances = $page.data.assistances;

  let displayedAssistance = null;

  const selectAssistance = (assistanceId) => {
    // Close the option modal
    displayedAssistance = null;

    // Open drawer for animation
    toggleDrawer();
    const assistanceUpdates = assistances.find((a) => a.id === assistanceId).updates;
    // Start animation when the drawer is fully up
    setTimeout(() => {
      GameData.resourceUpdater($GameData.resources, assistanceUpdates).then(() => {
        // Close drawer and advance game state after animations are finished
        toggleDrawer();
        setTimeout(() => {
          GameData.advanceGameState({ assistanceId });
        }, DRAWER_ANIM_DURATION);
      });
    }, DRAWER_ANIM_DURATION);
  };

  $: alreadySelectedAssistanceIds = $GameData.pastActions
    .filter((action) => action.assistanceId)
    .map((action) => action.assistanceId);
</script>

<h1
  style="width: 250px;
word-wrap: break-word; margin-bottom:.2em"
>
  {#if language === Languages.ENGLISH}
    Select an assistance
  {:else}
    Selecciona una asistencia
  {/if}
</h1>
<p
  style="width: 80%;
word-wrap: break-word; text-align:center;margin-block:.1em;"
>
  {#if language === Languages.ENGLISH}
    Assistances help with migrants' basic needs.
  {:else}
    Las asistencias ayudan a los migrantes con sus necesidades básicas.
  {/if}
</p>

<LearnMore>
  <h1 slot="title">
    {#if language === Languages.ENGLISH}
      Assistances
    {:else}
      Asistencias
    {/if}
  </h1>
  <p slot="body">
    {#if language === Languages.ENGLISH}
      Organizations such as the WFP, United Nations agencies and non-governmental organizations
      (NGOs) provide assistance in emergency contexts to people in vulnerable situations. In
      general, assistance is offered only once per type, so it is important to prioritize the most
      vulnerable and priority groups, such as pregnant women, people with disabilities, the elderly,
      children under 5 years of age, the LGBTQI+ population, among others.
    {:else}
      Organizaciones como el PMA, agencias de Naciones Unidas y organizaciones no gubernamentales
      (ONG) brindan asistencia en contextos de emergencia a personas en situación de vulnerabilidad.
      En general, la asistencia se ofrece una sola vez por tipo, por lo que es importante que se
      prioricen los grupos más vulnerables y prioritarios, como las mujeres embarazadas, las
      personas con discapacidad, los adultos mayores, los niños menores de 5 años, la población
      LGBTQI+, entre otros.
    {/if}
  </p>
</LearnMore>

<Modal showModal={displayedAssistance}>
  <div class="modal-body" slot="body">
    <img
      src="images/assistance/{displayedAssistance?.image || 'A_accreditation.png'}"
      alt="Accreditation"
    />
    <h1 style="margin-top: 0">{displayedAssistance?.name}</h1>
    <p id="modal-text">
      {displayedAssistance?.description}
    </p>
    <button
      class="button"
      style="margin-top: 1rem;"
      on:click={() => selectAssistance(displayedAssistance.id)}
    >
      {#if language === Languages.ENGLISH}
        Select
      {:else}
        Seleccionar
      {/if}
    </button>
  </div>
</Modal>

<section>
  {#each assistances as assistance (assistance.id)}
    <div class="centered-column">
      <button
        class="assist-thumb"
        title={assistance.name}
        disabled={alreadySelectedAssistanceIds.includes(assistance.id)}
        on:click={() => (displayedAssistance = assistance)}
      >
        <img src="/images/assistance/{assistance.image}" alt={assistance.name} />
      </button>
      <p style="margin: 0; position: relative; top: -10px; text-align: center">{assistance.name}</p>
    </div>
  {/each}
</section>

<style>
  section {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15vw;
    row-gap: 0.4rem;
  }

  .assist-thumb {
    all: unset;
  }

  .assist-thumb:hover {
    cursor: pointer;
  }

  img {
    height: min(15vh, 600px);
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .modal-body img {
    width: 50%;
    height: 50%;
  }

  #modal-text {
    margin-top: 0;
    margin-bottom: 2em;
  }

  button:disabled:hover {
    cursor: default;
  }

  button:disabled > img {
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  @media only screen and (max-width: 400px) {
    h1 {
      font-size: 22pt;
      margin-bottom: 0 !important;
    }

    p {
      font-size: 12pt;
      margin: 0 !important;
    }

    .centered-column > p {
      font-size: 11pt;
    }

    img {
      height: 14vh;
    }
  }

  @media only screen and (max-height: 700px) {
    section {
      row-gap: 0;
    }

    img {
      height: 13vh;
    }
  }
</style>
