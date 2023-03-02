<script>
  export let showModal;
  let dialog;
  $: if (dialog && showModal) dialog.showModal();
</script>

<dialog
  bind:this={dialog}
  on:close={() => {
    showModal = false;
  }}
  on:click|self={() => dialog.close()}
>
  <div id="modal-button-container">
    <button on:click={() => dialog.close()} id="modal-close"> &#x2715; </button>
  </div>
  <slot name="body" />
</dialog>

<style>
  dialog {
    max-width: 80vw;
    max-height: 80vh;
    border-radius: 32px;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
  }

  #modal-button-container {
    display: flex;
    justify-content: end;
  }

  #modal-close {
    background: transparent;
    border: none;
    font-size: 20pt;
  }
</style>
