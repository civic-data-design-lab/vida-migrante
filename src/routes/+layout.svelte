<script>
  import { browser } from '$app/environment';
  import '../app.css';
  import mt_pic from '$lib/assets/mountains_greyscale.png';

  function calcViewportUnits() {
    let vh = window.innerHeight / 100;
    let vw = window.innerWidth / 100;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }

  if (browser) calcViewportUnits();
</script>

<svelte:window on:resize={calcViewportUnits} />
<div id="bg">
  <slot />
</div>

<style>
  #bg {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(230, 230, 230, 0.5);
  }
</style>
