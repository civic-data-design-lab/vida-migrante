<script>
  import touchIcon from '$images/touch-app.svg';
  import { fade } from 'svelte/transition';
  import Timed from './Timed.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch('click');
  };

  /**
   * The message to display on the tap indicator (e.g. "Tap to flip")
   *
   * @type {string}
   */
  export let message;

  /**
   * If disabled, the tap indicator will never appear.
   *
   * @type {boolean}
   */
  export let disabled = false;

  let show = !disabled;
</script>

<Timed callback={() => (show = false)} waitTimeMs={6000}>
  {#if show}
    <button
      out:fade
      class="tap-indicator"
      on:click={() => {
        show = false;
        onClick();
      }}
    >
      <img src={touchIcon} alt="Touch icon" />
      <p for="draw-card">{message || ''}</p>
    </button>
  {/if}
  <div class={show ? 'fade-in-out' : ''} on:click={onClick} on:keydown={onClick}>
    <slot />
  </div>
</Timed>

<style>
  button {
    all: unset;
  }

  .tap-indicator {
    position: absolute;
    z-index: 1;
    inset: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
