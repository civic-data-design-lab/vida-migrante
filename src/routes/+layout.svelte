<script>
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { Languages } from '$types';
  import '../app.css';

  /** Layout data (language) */
  export let data;

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
  <form method="post">
    <li>
      <button
        style:background-color={data.language == Languages.ENGLISH ? 'red' : 'transparent'}
        formaction="/?/setLanguage&language=en&redirectTo={$page.url.pathname}">English</button
      >
      <button
        style:background-color={data.language == Languages.SPANISH ? 'red' : 'light-gray'}
        formaction="/?/setLanguage&language=es&redirectTo={$page.url.pathname}">Spanish</button
      >
    </li>
  </form>
  <slot />
</div>

<style>
  #bg {
    /* position: fixed; */
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  #bg:before {
    content: ' ';
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-image: url('$images/mountains-greyscale.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  form {
    position: absolute;
    right: 0;
  }
</style>
