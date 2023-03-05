<script>
  import AssistanceData from '$gameFiles/assistances.json';

  import Modal from '$lib/components/Modal.svelte';
  import { GameData } from '$lib/stores/gameData';

  let displayedAssistance = null;

  const selectAssistance = (assistanceId) => {
    console.debug(assistanceId);
    GameData.advanceGameState({ assistanceId });
  };
</script>

<Modal showModal={displayedAssistance}>
  <div class="modal-body" slot="body">
    <h2>{displayedAssistance?.name}</h2>
    <img
      src="images/assistance/{displayedAssistance?.image || 'A_accreditation.png'}"
      alt="Accreditation"
    />
    <p>
      {displayedAssistance?.description}
    </p>
    <button class="button" on:click={() => selectAssistance(displayedAssistance.id)}>Select</button>
  </div>
</Modal>

<h1>Select an assistance</h1>
<section>
  {#each AssistanceData as assistance (assistance.id)}
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
  }

  .modal-body img {
    width: 200px;
  }
</style>
