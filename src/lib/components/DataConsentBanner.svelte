<script>
  import { DATA_CONSENT_KEY } from '$lib/utils/types';
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let showBanner = false;

  onMount(() => {
    // Check if the user has accepted/declined cookies and tracking on this
    // browser. If not, show the banner.
    const hasDataConsent = localStorage.getItem(DATA_CONSENT_KEY);
    if (hasDataConsent === null) {
      console.debug('Data consent not received/rejected yet, showing banner...');
      showBanner = true;
    }
  });

  /**
   * Submits the consent status of the user.
   *
   * @param {boolean} accepted - Whether the user gave or declined data consent.
   */
  const submitConsent = (accepted) => {
    if (accepted) {
      localStorage.setItem(DATA_CONSENT_KEY, 'true');
    } else {
      localStorage.setItem(DATA_CONSENT_KEY, 'false');
    }

    // Hide the banner
    showBanner = false;
  };
</script>

{#if showBanner}
  <span class="banner-container" transition:fly={{ y: 200 }}>
    <div>
      <p>
        We use cookies and similar methods to recognize visitors, remember their preferences, and
        analyze site traffic.
      </p>
      <form>
        <button class="button" title="Accept" on:click={() => submitConsent(true)}>Accept</button>
        <button class="button" title="Decline" on:click={() => submitConsent(false)}>
          Decline
        </button>
      </form>
    </div>
  </span>
{/if}

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
