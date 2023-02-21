<script>
  /** @type {import("$types").Card} */
  export let card;
</script>

<article>
  <h1>{card.category}</h1>
  <img src={'/favicon.png'} alt="" />
  <p>{card.description}</p>
  <!-- TODO: Show resources required as an icon, as in Figma -->
  <p>Resources Required: {card.resourcesRequired}</p>
</article>

<style>
  article {
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
  }
</style>
