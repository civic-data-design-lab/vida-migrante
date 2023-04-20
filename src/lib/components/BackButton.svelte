<script>
  import { page } from '$app/stores';
  import { Languages } from '$lib/utils/types';

  $: buttonText = $page.data.language === Languages.SPANISH ? 'Volver' : 'Back';
</script>

<button on:click={() => history.back()} title={buttonText}>
  <img
    src="$images/keyboard-arrow-down_119013.svg"
    alt="Go
  back"
  />
  <h2>{buttonText}</h2>
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    background-color: transparent;
    border: none;
  }

  button:hover {
    cursor: pointer;
  }

  img {
    height: 10px;
    color: #6f6f6f;
    transform: rotate(90deg);
  }

  h2 {
    margin: 0;
    padding-top: 2px;
  }
</style>
