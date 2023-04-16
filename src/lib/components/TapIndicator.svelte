<script>
  import touchIcon from '$images/touch-app.svg';
  import Timed from './Timed.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const onClick = () => {
    show = false;
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
  export let grow = false;
  let show = !disabled;
</script>

<Timed callback={() => (show = false)} waitTimeMs={6000}>
  <button class="tap-indicator-wrapper" on:click={onClick} style="height: {grow ? '100%' : ''}">
    {#if show}
      <div class="tap-indicator-content">
        <img src={touchIcon} alt="Touch icon" />
        <p for="draw-card">{message || ''}</p>
      </div>
    {/if}
    <div class="tap-indicator-body {show ? 'fade-in-out' : ''}" style="height: {grow ? '100%' : ''}">
      <slot />
    </div>
  </button>
</Timed>

<style>
  button {
    all: unset;
  }

  .tap-indicator-content {
    position: absolute;
    z-index: 1;
    inset: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tap-indicator-wrapper {
    position: relative;
  }
</style>
