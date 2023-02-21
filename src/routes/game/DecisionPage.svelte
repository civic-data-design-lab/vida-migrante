<script>
  import cardData from '$gameFiles/card-data.json';
  import Card from '$components/Card.svelte';

  let tempCard = cardData[0];
</script>

<Card card={tempCard} />
