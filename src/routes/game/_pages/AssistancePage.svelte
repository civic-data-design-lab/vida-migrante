<script>
  import Modal from '$lib/components/Modal.svelte';
  import { GameData } from '$lib/stores/gameData';
  import { page } from '$app/stores';
  import { DRAWER_ANIM_DURATION, Languages } from '$lib/utils/types';

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

{#if language === Languages.ENGLISH}
  <h1
    style="width: 250px;
word-wrap: break-word; margin-bottom:.2em; "
  >
    Select an assistance
  </h1>
  <p
    style="width: 80%;
word-wrap: break-word; text-align:center;margin-bottom:.1em;"
  >
    Assistances help with migrants' basic needs.
  </p>
{:else}
  <h1
    style="width: 250px;
word-wrap: break-word; margin-bottom:.2em;"
  >
    Selecciona una asistencia
  </h1>
  <p
    style="width: 80%;
word-wrap: break-word;margin-top:.1em; text-align:center; margin-bottom:.1em;"
  >
    Las asistencias ayudan a los migrantes con sus necesidades básicas.
  </p>
{/if}

<Modal showModal={displayedAssistance}>
  <div class="modal-body" slot="body">
    <img
      src="images/assistance/{displayedAssistance?.image || 'A_accreditation.png'}"
      alt="Accreditation"
    />
    <h1>{displayedAssistance?.name}</h1>
    <p id="modal-text">
      {displayedAssistance?.description}
    </p>
    <button class="button" on:click={() => selectAssistance(displayedAssistance.id)}>
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
    <button
      class="assist-thumb"
      disabled={alreadySelectedAssistanceIds.includes(assistance.id)}
      on:click={() => (displayedAssistance = assistance)}
    >
      <img src="/images/assistance/{assistance.image}" alt={assistance.name} />
    </button>
  {/each}
</section>

<style>
  section {
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20vw;
    row-gap: 0.4rem;
  }

  .assist-thumb {
    all: unset;
    width: 100%;
  }

  .assist-thumb:hover {
    cursor: pointer;
  }

  img {
    height: 15vh;
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
</style>
