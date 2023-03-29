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
    botThreshold = vh * 85;
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
    height: 100vh;
    width: 100vw;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: #f9f9f9;
    filter: drop-shadow(0px -5px 5px rgba(0, 0, 0, 0.3));
    animation: wiggle 7s infinite;
    animation-delay: 2s;
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
    width: 137px;
    margin-block: calc(2vh - 6px);
    margin-bottom: 0;
    cursor: ns-resize;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #drawer-handle {
    background: rgba(150, 150, 150, 0.8);
    height: 3px;
    width: 137px;
    border-radius: 4px;
    margin-bottom: 0;
  }

  @keyframes wiggle {
    0%,
    100% {
      transform: translate(0rem);
    }
    10% {
      transform: translate(0, 0rem);
    }
    20% {
      transform: translate(0, 0rem);
    }
    30% {
      transform: translate(0, 0rem);
    }
    40% {
      transform: translate(0, 0rem);
    }
    50% {
      transform: translate(0, -1rem);
    }
    60% {
      transform: translate(0, 0rem);
    }
    70% {
      transform: translate(0, 0rem);
    }
    80% {
      transform: translate(0, 0rem);
    }
    90% {
      transform: translate(0, 0rem);
    }
  }
</style>
