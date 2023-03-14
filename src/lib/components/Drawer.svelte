<script>
  import { onMount } from 'svelte';

  let dragging = false;
  let windowHeight, topThreshold, botThreshold, drawerTop;
  let handle,
    cancelClick = false;
  let prevTouch,
    transition = '';

  onMount(() => {
    const vh = windowHeight / 100;
    topThreshold = vh * 15;
    botThreshold = vh * 85;
    drawerTop = botThreshold;
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
    if (prevTouch !== null) {
      const rect = handle.getBoundingClientRect();
      const x = prevTouch.clientX,
        y = prevTouch.clientY;
      if (x < rect.left || y < rect.top || x > rect.right || y < rect.bottom) {
        cancelClick = false;
      }
      prevTouch = null;
    }
  }

  function toggleDrawer() {
    if (cancelClick) cancelClick = false;
    else {
      transition = 'top 1s ease';
      const tolerance = (botThreshold - topThreshold) / 5;
      if (botThreshold - drawerTop < tolerance) drawerTop = topThreshold;
      else drawerTop = botThreshold;
    }
  }
</script>

<div id="floating" style="top: {drawerTop}px; transition: {transition}">
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
  #floating {
    position: fixed;
    height: 85vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background: white;
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
</style>
