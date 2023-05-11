<script>
  import Modal from '$components/Modal.svelte';
  import { Languages } from '$lib/utils/types';
  import { page } from '$app/stores';

  $: language = $page.data.language;
  let showModal = false;
</script>

<span on:click={() => (showModal = true)}>
  {#if language === Languages.ENGLISH}
    Learn more
  {:else}
    Aprende más
  {/if}
</span>
<Modal bind:showModal>
  <div id="modal-body" class="centered-column" slot="body">
    <h1 id="modal-title">
      <slot name="title" />
    </h1>
    <p>
      <slot name="body" />
    </p>
  </div>
</Modal>

<style>
  span {
    font-family: var(--font-sirenia);
    margin-top: 5px;
    font-size: 12pt;
  }

  span:hover,
  span:active {
    cursor: pointer;
    text-decoration: underline;
    color: #000;
  }
</style>
