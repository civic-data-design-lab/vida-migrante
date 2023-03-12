<script>
</script>

<div id="floating">
  <div id="drawer-handle" />
  <slot name="body" />
</div>

<style>
  #floating {
    position: fixed;
    height: 85vh;
    width: 100vw;
    top: 85vh;

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
  }
</style>
