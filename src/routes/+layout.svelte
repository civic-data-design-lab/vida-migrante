<script>
  import { browser } from '$app/environment';
  import '../app.css';

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
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  #bg:before {
    content: ' ';
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url('$images/mountains-greyscale.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
