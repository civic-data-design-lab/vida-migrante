<script>
  import { onMount } from 'svelte';

  let dragging = false;
  let windowHeight, topThreshold, botThreshold, drawerTop, backdropThreshold;
  let handle, prevTouch;
  let cancelClick = false;
  let transition = '';

  onMount(() => {
    const vh = windowHeight / 100;
    topThreshold = vh * 15;
    botThreshold = vh * 90;
    drawerTop = botThreshold;
    backdropThreshold = botThreshold - (botThreshold - topThreshold) / 5;
  });

  function boundDrag(newVal) {
    drawerTop = Math.min(Math.max(newVal, topThreshold), botThreshold);
  }

  function onMouseDown() {
    dragging = true;
    transition = '';
  }

  function onMouseMove(e) {
    if (dragging) {
      boundDrag(drawerTop + e.movementY);
      cancelClick = true;
    }
  }

  function onMouseUp(e) {
    dragging = false;
    if (!e.target.id.startsWith('drawer-handle')) cancelClick = false;
  }

  function onTouchStart(e) {
    dragging = true;
    transition = '';
    prevTouch = e.touches[0];
  }

  function onTouchMove(e) {
    const touch = e.touches[0];
    if (dragging) {
      const movementY = touch.clientY - prevTouch.clientY;
      boundDrag(drawerTop + movementY);
      cancelClick = true;
    }
    prevTouch = touch;
  }

  function onTouchEnd() {
    dragging = false;
    if (prevTouch !== undefined) {
      const rect = handle.getBoundingClientRect();
      const x = prevTouch.clientX,
        y = prevTouch.clientY;
      if (x < rect.left || y < rect.top || x > rect.right || y < rect.bottom) {
        cancelClick = false;
      }
      prevTouch = undefined;
    }
  }

  function toggleDrawer() {
    if (cancelClick) cancelClick = false;
    else {
      transition = 'top 1s ease, background-color 1s ease';
      const tolerance = (botThreshold - topThreshold) / 2.5;
      if (botThreshold - drawerTop < tolerance) drawerTop = topThreshold;
      else drawerTop = botThreshold;
    }
  }

  function closeDrawer() {
    transition = 'top 1s ease, background-color 1s ease';
    drawerTop = botThreshold;
  }
</script>

<div
  id="drawer-backdrop"
  style="
    background-color: {`rgba(0, 0, 0, ${1 - drawerTop / backdropThreshold})`};
    pointer-events: {drawerTop < backdropThreshold ? 'all' : 'none'};
    transition: {transition}
  "
  on:click={closeDrawer}
/>
<div id="drawer" style="top: {drawerTop}px; transition: {transition}">
  <div
    id="drawer-handle-hitbox"
    on:touchstart={onTouchStart}
    on:mousedown={onMouseDown}
    on:click={toggleDrawer}
    bind:this={handle}
  >
    <div id="drawer-handle" />
  </div>
  <slot name="body" />
</div>
<svelte:window
  bind:innerHeight={windowHeight}
  on:touchmove={onTouchMove}
  on:touchend={onTouchEnd}
  on:mousemove={onMouseMove}
  on:mouseup={onMouseUp}
/>

<style>
  #drawer {
    position: fixed;
    height: 85vh;
    width: 100vw;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #fcfcfc;
    filter: drop-shadow(0px -5px 8px);
    /* animation: wiggle 3s infinite;
    animation-delay: 0.5s; */
  }

  #drawer-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 1;
  }

  #drawer-handle-hitbox {
    height: 20px;
    width: 75px;
    margin-block: calc(2.5vh - 8px);
    cursor: ns-resize;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #drawer-handle {
    background: rgba(150, 150, 150, 0.8);
    height: 8px;
    width: 50px;
    border-radius: 4px;
  }

  /* @keyframes wiggle {
    0%,
    100% {
      transform: translate(0rem);
    }
    25% {
      transform: translate(0, 0rem);
    }
    75% {
      transform: translate(0, 0rem);
    }
    50% {
      transform: translate(0, -5rem);
    }
  } */
</style>
