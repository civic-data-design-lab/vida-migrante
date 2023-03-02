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
  <button on:click={() => dialog.close()}> X </button>
  <slot name="body" />
</dialog>

<style>
  dialog {
    max-width: 90vw;
    max-height: 90vh;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
  }
</style>
