<!-- Wrapper component that calls a callback after a certain amount of time.
Can be used as a transitionary page during the game, for example. -->
<script>
  import { onMount, onDestroy } from 'svelte';

  /**
   * The callback function to call when the timeout has elapsed.
   *
   * @type {function}
   */
  export let callback;

  /**
   * The amount of time to wait before calling the callback in milliseconds.
   *
   * @type {number}
   */
  export let waitTimeMs;

  let timeout = null;

  onMount(() => {
    timeout = setTimeout(callback, waitTimeMs);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<slot />
