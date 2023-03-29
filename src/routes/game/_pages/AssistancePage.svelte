<script>
  import Modal from '$lib/components/Modal.svelte';
  import { GameData } from '$lib/stores/gameData';
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  // Get the page data
  $: language = $page.data.language;
  $: assistances = $page.data.assistances;

  let displayedAssistance = null;

  const selectAssistance = (assistanceId) => {
    GameData.advanceGameState({ assistanceId });
  };
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
    Assistance help migrants' basic needs.
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
    <button class="assist-thumb" on:click={() => (displayedAssistance = assistance)}>
      <img src="/images/assistance/{assistance.image}" alt={assistance.name} />
    </button>
  {/each}
</section>

<style>
  section {
    margin-top: 1em;
    height: 85vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20vw;
    overflow-y: hidden;
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
</style>
