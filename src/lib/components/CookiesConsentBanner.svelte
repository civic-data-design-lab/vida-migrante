<script>
  import { fly } from 'svelte/transition';
</script>

<span class="banner-container" transition:fly={{ y: 200 }}>
  <div>
    <p>
      We use cookies and similar methods to recognize visitors and remember their preferences. We
      also use them to analyze site traffic.
    </p>
    <form>
      <button class="button">Accept</button>
      <button class="button">Decline</button>
    </form>
  </div>
</span>

<style>
  .banner-container {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 10;
    background-color: var(--light-yellow);
    border-top: 1px solid var(--light-gray);
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  }

  div {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  form {
    display: flex;
    gap: 0.5rem;
  }

  p {
    margin: 0;
    vertical-align: baseline;
  }

  button {
    font-size: small;
    padding: 0.25rem 1.5rem;
  }
</style>
