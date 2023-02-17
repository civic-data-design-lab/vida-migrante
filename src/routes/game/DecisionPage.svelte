<script>
  import cardData from '@gamefiles/card-data.json';
  import Card from '@components/Card.svelte';

  let tempCard = cardData[0];
</script>

<Card card={tempCard} />
