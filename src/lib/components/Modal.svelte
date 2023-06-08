<script>
  export let showModal;
  export let closable = true;
  let dialog;
  $: if (dialog) {
    if (showModal) dialog.showModal();
    else dialog.close();
  }
</script>

<dialog
  bind:this={dialog}
  on:close={() => {
    showModal = false;
  }}
  on:click|self={() => {if (closable) dialog.close()}}
>
  <div id="modal-button-container" style="transition: 200ms ease;">
    {#if closable}
      <button on:click={() => dialog.close()} id="modal-close"> &#x2715; </button>
    {/if}
  </div>
  <slot name="body" />
</dialog>

<style>
  dialog {
    max-width: 80vw;
    max-height: 80vh;
    border-radius: 32px;
    border-width: 2px;
    animation: popup 500ms ease-out;
  }

  dialog::-webkit-scrollbar {
    display: none;
  }

  dialog::backdrop {
    animation: dissolve;
    animation-timing-function: ease-in;
    animation-duration: 500ms;
    transition: 200ms ease;
    opacity: 0.3;
    background: rgba(0, 0, 0);
  }

  @keyframes popup {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.01);
    }
  }

  @keyframes dissolve {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.15;
    }
    100% {
      opacity: 0.3;
    }
  }
  #modal-button-container {
    display: flex;
    justify-content: end;
  }

  #modal-close {
    background: transparent;
    border: none;
    font-size: 2em;
    color: var(--gray);
    padding: 0;
  }
</style>
