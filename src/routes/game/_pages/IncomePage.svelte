<script>
  import { GameData } from '$gameData';
  import { Languages } from '$lib/utils/types';
  import { page } from '$app/stores';

  $: language = $page.data.language;
</script>

{#if language == Languages.ENGLISH}
  <h1>Your income for the month:</h1>
  <h1>Salary: +${$GameData.resources?.income.salary}</h1>
  <h1>Assistance: +${$GameData.resources?.income.assistance}</h1>
{:else}
  <h1>Tu ingreso mensual:</h1>
  <h1>Salario: +${$GameData.resources?.income.salary}</h1>
  <h1>Asistencias: +${$GameData.resources?.income.assistance}</h1>
{/if}
<button class="button" on:click={GameData.advanceGameState}>Continue</button>
