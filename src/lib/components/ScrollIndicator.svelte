<script>
  import arrowIcon from '$images/keyboard-arrow-down_119013.svg';
</script>

<div class="fade-in-out">
  <p>Scroll to continue</p>
  <img class="arrow-icon" src={arrowIcon} alt="Scroll to see more" />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    margin: 0.5rem 0;
  }

  .arrow-icon {
    height: 8px;
  }
</style>
