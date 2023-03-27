<script>
  import { slide } from 'svelte/transition';
  import timeIcon from '$images/time.svg';
  import moneyIcon from '$images/money.svg';
  import { CARD_CATEGORY_COLOR_MAP } from '$types';
  import TapIndicator from './TapIndicator.svelte';
  import { sumValues } from '$lib/utils/functions';

  /** @type {import("$types").Card} */
  export let card;

  /**
   * Whether or not the card is in its minimized state.
   * @type {boolean}
   */
  export let minimized;

  /** Callback function on card tap. */
  export let onCardTap;

  export let roundNum;

  const getCardDetails = () => {
    // Use set to avoid adding duplicates
    const cardDetails = {
      requiredResources: new Set(),
      skillsEarned: new Set(),
      accreditationsEarned: new Set(),
    };
    card.options.forEach((option) => {
      const updates = option.updates;
      if (updates.income?.salary < 0 || sumValues(updates.expenditures) > 0) {
        cardDetails.requiredResources.add(moneyIcon);
      }
      if (updates.time) {
        cardDetails.requiredResources.add(timeIcon);
      }
      if (updates.skills?.length) {
        updates.skills.forEach((skill) => cardDetails.skillsEarned.add(skill));
      }
      if (updates.accreditations?.length) {
        updates.accreditations.forEach((skill) => cardDetails.accreditationsEarned.add(skill));
      }
    });

    cardDetails.requiredResources = Array.from(cardDetails.requiredResources);
    cardDetails.skillsEarned = Array.from(cardDetails.skillsEarned);
    cardDetails.accreditationsEarned = Array.from(cardDetails.accreditationsEarned);
    return cardDetails;
  };

  $: cardDetails = getCardDetails();
</script>

<TapIndicator message="Tap to show options" on:click={onCardTap} disabled={roundNum !== 1}>
  {#key minimized}
    <article in:slide={{ duration: 200 }} style="height: {minimized ? 'max-content' : '510px'};">
      <header style="background-color: var(--accent-{CARD_CATEGORY_COLOR_MAP[card.category]});">
        <h1>{card.title}</h1>
      </header>
      {#if !minimized}
        <img class="card-image" src={`/images/card-visuals/${card.image}`} alt="Card visual" />
        <p class="card-description">{card.description}</p>
      {/if}
      <!-- Display the updates that the card may provide -->
      <section class="card-updates">
        {#if cardDetails.requiredResources.length}
          <span class="resources-required">
            <p>Resources Required:</p>
            {#each cardDetails.requiredResources as iconSrc}
              <img src={iconSrc} alt="Resource required" />
            {/each}
          </span>
        {/if}
        {#if cardDetails.skillsEarned.length}
          <p style="text-transform: capitalize;">
            Skills Earned: {cardDetails.skillsEarned.join(', ')}
          </p>
        {/if}
        {#if cardDetails.accreditationsEarned.length}
          <p style="text-transform: capitalize;">
            Accreditations Earned: {cardDetails.accreditationsEarned.join(', ')}
          </p>
        {/if}
      </section>
    </article>
  {/key}
</TapIndicator>

<style>
  article {
    position: relative;
    width: 320px;
    max-width: 80vw;

    background-color: white;
    border: 2px solid #505050;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
    border-radius: 24px;

    display: flex;
    flex-direction: column;
  }

  header {
    /* Keep header at the top even if card scrolls */
    position: sticky;
    top: 0;

    border-radius: 22px 22px 0 0;
    min-height: 70px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin: 0;
    color: white;
    font-size: 36px;
  }

  p {
    text-align: left;
    font-size: 16px;
    line-height: 20px;
    margin: 0;
  }

  .card-description {
    padding: 0 2rem;
  }

  .card-image {
    width: 100%;
    /* Adjust image margins since it has some deadspace */
    margin-bottom: -10px;
    margin-top: -15px;
  }

  .card-updates {
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .resources-required {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .resources-required p {
    margin: 5px 0 0 0;
  }
</style>
