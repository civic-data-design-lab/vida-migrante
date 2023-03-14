<script>
  import { onMount } from 'svelte';

  let dragging = false;
  let windowHeight, topThreshold, botThreshold, drawerTop;
  let previousTouch, drawer, cancelClick = false;
  let transition = '';

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
    transition = '';
  }

  function onMouseMove(e) {
    if (dragging) {
      boundDrag(drawerTop + e.movementY);
      cancelClick = true;
    }
  }

  function onTouchMove(e) {
    const touch = e.touches[0];
    if (dragging) {
      const movementY = touch.pageY - previousTouch.pageY;
      boundDrag(drawerTop + movementY);
      cancelClick = true;
    }
    previousTouch = touch;
  }

  function onDragEnd() {
    dragging = false;
    previousTouch = null;
    if (cancelClick) {
      drawer.addEventListener('click', captureClick, {capture: true, once: true});
    }
    cancelClick = false;
  }

  function captureClick(e) {
    e.stopPropagation();
  }

  function toggleDrawer() {
    transition = 'top 1s ease';
    const tolerance = (botThreshold - topThreshold) / 5;
    if (botThreshold - drawerTop < tolerance) drawerTop = topThreshold;
    else drawerTop = botThreshold;
  }
</script>

<div id="floating" style="top: {drawerTop}px; transition: {transition}" bind:this={drawer}>
  <div
    id="drawer-handle"
    on:touchstart={onDragStart}
    on:mousedown={onDragStart}
    on:click={toggleDrawer}
  />
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
