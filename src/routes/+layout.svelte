<script>
  import { onMount } from 'svelte';
  import '../app.css';
  import PageHead from '$lib/components/PageHead.svelte';

  function calcViewportUnits() {
    let vh = window.innerHeight / 100;
    let vw = window.innerWidth / 100;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }

  onMount(calcViewportUnits);

  export let data;
</script>

<PageHead {...data.seoProps} />
<svelte:window on:resize={calcViewportUnits} />
<div id="bg">
  <slot />
</div>

<style>
  #bg {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #bg:before {
    content: ' ';
    position: fixed;
    top: 30%;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    filter: saturate(0%);
    background-image: url('$images/mountains.png');
    background-position: 60% 0;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
