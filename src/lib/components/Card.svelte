<script>
  import { slide } from 'svelte/transition';

  /** @type {import("$types").Card} */
  export let card;
</script>

<article transition:slide>
  <h1>{card.title}</h1>
  <img
    class="card-image"
    src={`/images/card-visuals/${card.image}`}
    alt="Card
  visual"
  />
  <section class="card-details">
    <p>{card.description}</p>
    <!-- TODO: Show resources required as an icon, as in Figma -->
    <p>Resources Required: {card.resourcesRequired}</p>
  </section>
</article>

<style>
  article {
    width: 320px;
    max-width: 90vw;
    aspect-ratio: 0.65;
    /* height: 500px; */

    background-color: white;
    border: 2px solid #505050;
    box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
    border-radius: 24px;

    display: flex;
    flex-direction: column;
  }

  h1 {
    margin: 0;
    border-radius: 22px 22px 0 0;
    background-color: #cf6348;
    color: white;
    text-align: center;
  }

  p {
    /* Move up since image bottom has some deadspace */
    margin-top: -10px;
    text-align: left;
  }

  .card-image {
    width: 100%;
  }

  .card-details {
    padding: 0 2rem;
  }
</style>
