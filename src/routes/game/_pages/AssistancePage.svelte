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
      Assistance help migrants fill gaps in their coverage of basic needs. This aid might come in
      the form of food vouchers, training, or in-kind goods. Organizations such as WFP, the UN,
      NGOs, and the Ecuadorian government provide help to migrants in vulnerable positions.
      Assistance are usually offered just once per type, so it’s important for the agencies that
      provide them to target the correct groups, and for migrants to acknowledge this. Only 11% of
      our respondents received assistance, making it very important to expand their reach.
    {:else}
      La asistencia ayuda a los migrantes a llenar los vacíos en la cobertura de sus necesidades
      básicas. Esta ayuda puede venir en forma de cupones de alimentos, capacitación o bienes en
      especie. Organizaciones como el PMA, la ONU, ONG y el gobierno ecuatoriano brindan ayuda a los
      migrantes en situaciones de vulnerabilidad. Por lo general, la asistencia se ofrece solo una
      vez por tipo, por lo que es importante que las agencias que la brindan se dirijan a los grupos
      correctos y que los migrantes lo reconozcan. Solo el 11% de nuestros encuestados recibió
      asistencia, por lo que es importante ampliar su alcance.
    {/if}
  </p>
</LearnMore>

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
