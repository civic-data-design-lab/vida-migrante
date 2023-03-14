<script>
  import { onMount } from 'svelte';

  let previousTouch;
  let dragging = false;
  let windowHeight, topThreshold, botThreshold, drawerTop;

  onMount(() => {
    const vh = windowHeight / 100;
    topThreshold = vh * 15;
    botThreshold = vh * 85;
    drawerTop = botThreshold;
  });

  function boundDrag(newVal) {
    drawerTop = Math.min(Math.max(newVal, topThreshold), botThreshold);
  }

  function onDragStart(e) {
    dragging = true;
    if (e.type === 'touchstart') previousTouch = e.touches[0];
  }

  function onMouseMove(e) {
    if (dragging) boundDrag(drawerTop + e.movementY);
  }

  function onTouchMove(e) {
    const touch = e.touches[0];
    if (dragging) {
      const movementY = touch.pageY - previousTouch.pageY;
      boundDrag(drawerTop + movementY);
    }
    previousTouch = touch;
  }

  function onDragEnd() {
    dragging = false;
    previousTouch = null;
  }
</script>

<div id="floating" style="top: {drawerTop}px">
  <div id="drawer-handle" on:touchstart={onDragStart} on:mousedown={onDragStart} />
  <slot name="body" />
</div>
<svelte:window
  bind:innerHeight={windowHeight}
  on:touchmove={onTouchMove}
  on:touchend={onDragEnd}
  on:mousemove={onMouseMove}
  on:mouseup={onDragEnd}
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

  #drawer-handle {
    background: rgba(150, 150, 150, 0.8);
    height: 8px;
    width: 50px;
    border-radius: 4px;
    margin-block: calc(2.5vh - 8px);
    cursor: ns-resize;
  }
</style>
