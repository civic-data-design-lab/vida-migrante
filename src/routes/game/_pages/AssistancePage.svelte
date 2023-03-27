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

<Modal showModal={displayedAssistance}>
  <div class="modal-body" slot="body">
    <img
      src="images/assistance/{displayedAssistance?.image || 'A_accreditation.png'}"
      alt="Accreditation"
    />
    <h2>{displayedAssistance?.name}</h2>
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

<h1
  style="width: 250px;
word-wrap: break-word;"
>
  {#if language === Languages.ENGLISH}
    Select an assistance
  {:else}
    Selecciona una asistencia
  {/if}
</h1>
<section>
  {#each assistances as assistance (assistance.id)}
    <button class="assist-thumb" on:click={() => (displayedAssistance = assistance)}>
      <img src="/images/assistance/{assistance.image}" alt={assistance.name} />
    </button>
  {/each}
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }

  .assist-thumb {
    all: unset;
    width: 100px;
  }

  .assist-thumb:hover {
    cursor: pointer;
  }

  img {
    width: 100%;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .modal-body img {
    width: 200px;
  }

  #modal-text {
    margin-top: 0;
    margin-bottom: 2em;
  }
</style>
