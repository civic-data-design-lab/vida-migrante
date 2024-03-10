<!-- Represents an info icon that, when clicked, displays a modal. -->
<script>
  import infoIcon from '$images/info.png';
  import Modal from './Modal.svelte';

  /**
   * Pin the info icon to the top right corner of the parent `div` element. Make
   * sure the parent's position is set to `relative` if using this.
   *
   * @type {boolean}
   */
  export let pinned;

  let showModal = false;
</script>

<Modal bind:showModal>
  <slot slot="body" />
</Modal>
<button class:topright={pinned} class="info-button" on:click={() => (showModal = true)}>
  <img class="info-icon" src={infoIcon} alt="Info" />
</button>

<style>
  button {
    all: unset;
  }

  button:hover {
    cursor: pointer;
  }

  button:focus {
    border: 1px solid var(--gray);
    border-radius: 50%;
  }

  .info-button {
    width: 16px;
    height: 16px;
    display: grid;
    place-items: center;
    border: 1px solid transparent;
  }

  .info-icon {
    width: 100%;
  }

  .topright {
    position: absolute;
    right: 0px;
    top: 0px;
  }
</style>
