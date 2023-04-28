<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import Modal from '$components/Modal.svelte';
  import { GameData } from '$gameData';
  import { page } from '$app/stores';
  import { isFoodSecure, sumValues } from '$lib/utils/functions';
  import { spendings } from '$gameFiles/expenses.json';
  import { DAYS_IN_WEEK, Languages, RESOURCE_UPDATE_ANIM_DURATION } from '$lib/utils/types';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  const migrants = $page.data.migrantData.migrants;

  $: language = $page.data.language;
  $: isEn = language === Languages.ENGLISH;

  $: playerExpenses = parseInt(sumValues($GameData.resources?.expenditures));
  $: playerIncome = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;
  $: hoursWorked = Math.round($GameData.resources?.time / DAYS_IN_WEEK);

  const animatedPlayerExpenses = tweened(playerExpenses, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: linear,
  });

  const animatedPlayerIncome = tweened(playerIncome, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: linear,
  });
  const animatedHoursWorked = tweened(hoursWorked, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: linear,
  });

  $: animatedPlayerExpenses.set(playerExpenses);
  $: animatedPlayerIncome.set(playerIncome);
  $: animatedHoursWorked.set(hoursWorked);

  // Get the migrant's food security status
  $: migrantInfo = migrants.find((migrant) => migrant.id === $GameData.migrantId);

  $: foodSecureText = isEn ? 'Food Secure' : 'Seguridad Alimentaria';
  $: foodInsecureText = isEn ? 'Food Insecure' : 'Inseguridad Alimentaria';
  let foodSecurityStatus;
  $: {
    console.debug('Calculating food security');
    const foodSecure = isFoodSecure(
      sumValues($GameData.resources?.expenditures),
      migrantInfo.householdSize,
      $GameData.resources?.copingLevel
    );
    foodSecurityStatus = foodSecure ? foodSecureText : foodInsecureText;
  }

  //create the oval charts
  let displayedSpending = null;
  let total_columns;
  const max_expense = 850;
  $: expenses = new Array(total_columns).fill('oval');
  $: columns = Math.floor((total_columns * $animatedPlayerExpenses) / max_expense);
  $: income_column = Math.ceil((total_columns * $animatedPlayerIncome) / max_expense);
  $: expenses = expenses.map((_, i) => {
    let ovalClass = 'oval';
    if (i <= columns) ovalClass += ' oval_filled';
    if (i === income_column) ovalClass += ' oval_green';
    switch (i) {
      case Math.floor((313 * total_columns) / 850):
        ovalClass += ' indicator indicator_rent';
        break;
      case Math.floor((840 * total_columns) / 850):
        ovalClass += ' indicator indicator_red';
        break;
      case Math.floor((540 * total_columns) / 850):
        ovalClass += ' indicator indicator_yellow';
        break;
      case Math.floor((761 * total_columns) / 850):
        ovalClass += ' indicator indicator_blue';
    }
    return ovalClass;
  });

  //slider
  let slider_theme = 'default';
  for (let spending of spendings) {
    spending.expense = $GameData.resources?.expenditures[spending.name2];
  }

  let expenseReferences = true;

  function computeColumns() {
    total_columns = Math.floor((window.innerWidth * 0.9) / 10);
  }
  onMount(computeColumns);
</script>

<div id="expense-board">
  <div class="alignleft">
    <p4 style="color: #505050; font-weight: 500; font-size: 14.5pt; margin-bottom:.4em;"
      >{#if isEn} Expenses: {:else} Gastos: {/if}
      <b>${Math.floor($animatedPlayerExpenses)}</b></p4
    >
  </div>
  <div class="alignleft">
    <p4 style="color: #7BA522; font-weight: 500; font-size: 14.5pt; margin-bottom:.4em;"
      >{#if isEn} Income:{:else} Ingresos: {/if}
      <b>${Math.floor($animatedPlayerIncome)}</b></p4
    >
  </div>
</div>
<div id="expense-bars">
  <section>
    {#each expenses as color}
      <div class={color} />
    {/each}
  </section>
</div>
<div id="migrant-state">
  {#if isEn}
    <p4 style="width:100%; font-weight: 500; font-size: 11pt; margin-top:.5rem; text-align:left;"
      >You work <b><i>~{Math.floor($animatedHoursWorked)}</i></b> hours each day & you are
      <b><i>{foodSecurityStatus}</i></b>.</p4
    >
  {:else}
    <p4 style="font-weight: 500; font-size: 11pt; margin-top:.5rem; text-align:left;"
      >Trabajas <b><i>~{Math.floor($animatedHoursWorked)}</i></b> horas cada día & tienes
      <b><i>{foodSecurityStatus}</i></b>.</p4
    >
  {/if}
</div>
<div id="" style=" align-items: center;  place-content: center;   display: flex; padding-top:1em">
  <button
    id="modal-button-key"
    class="button"
    on:click={() => (expenseReferences = !expenseReferences)}
  >
    {#if isEn}Show Key Indicators
    {:else}Ver Indicadores Clave
    {/if}
    {#if expenseReferences}
      -
    {:else}
      +
    {/if}
  </button>
</div>
{#key expenseReferences}
  <div
    id="expense-references"
    class={expenseReferences ? 'visible' : 'hidden'}
    transition:slide={{ duration: 200 }}
  >
    <div id="name-board">
      <div class="alignleft">
        <p4 style="color: var(--light-red);"
          >{#if isEn}Average Migrant Household Income
          {:else}
            Ingreso Promedio de Migrantes{/if}</p4
        >
      </div>
      <div class="alignleft">
        <p4 style="color: #CF6348;"
          >{#if isEn}Average Ecuadorian Income
          {:else}
            Ingreso Promedio de Hogar en Ecuador{/if}</p4
        >
      </div>
      <div class="alignleft">
        <p4 style="color: #E5B257;"
          >{#if isEn}Ecuadorian Vital Family Basket
          {:else}
            Canasta Vital en Ecuador{/if}</p4
        >
      </div>
      <div class="alignleft">
        <p4 style="color: #5273B0;"
          >{#if isEn}Ecuadorian Basic Family Basket
          {:else}
            Canasta Básica en Ecuador{/if}</p4
        >
      </div>
    </div>
    <div id="money-board">
      <p4 class="alignright" style="color: var(--light-red); float: right;"> $313 </p4>
      <p4 class="alignright" style="color: #CF6348; float: right;"> $840 </p4>
      <p4 class="alignright" style="color: #E5B257; float: right;"> $540 </p4>
      <p4 class="alignright" style="color: #5273B0; float: right;"> $761 </p4>
    </div>
  </div>
{/key}
<hr />
<div style="display: flex; flex-direction: column; align-content: center; justify-content: center;">
  <h2 style="margin-bottom: 0;">
    {#if isEn}Allocate Your Spending{:else}Asigna tus Gastos {/if}
  </h2>
  {#each spendings as spending (spending.name)}
    <div style="display: flex; justify-content: space-between;">
      <href class="info" style="padding:.4em" on:click={() => (displayedSpending = spending)}>
        <p4 class="range-label" style="font-size:9pt;   text-decoration-line: underline;"
          >{#if isEn}
            {(slider_theme = spending.name)}{:else}
            {(slider_theme = spending.spanish_name)}
          {/if}</p4
        >
      </href>
      <p4>${spending.expense}</p4>
    </div>
    <div
      class:rent-theme={spending.name === 'Rent' || spending.name === 'Alquiler'}
      class:food-theme={spending.name === 'Food' || spending.name === 'Alimentos'}
      class:health-theme={spending.name === 'Health & Hygiene' ||
        spending.name === 'Salud e Higiene'}
      class:household-theme={spending.name === 'Household & Utilities' ||
        spending.name === 'Hogar y Servicios'}
      class:remittances-theme={spending.name === 'Remittances' || spending.name === 'Remesas'}
      class:internet-theme={spending.name === 'Internet' || spending.name === 'Internet'}
    >
      <Range
        on:change={(e) => {
          let old = spending.expense;
          spending.expense = e.detail.value;
          playerExpenses += spending.expense - old;
        }}
        min={0}
        max={200}
        value={spending.expense}
      />
    </div>
  {/each}
</div>
<svelte:window on:resize={computeColumns} />

<Modal showModal={displayedSpending}>
  <div id="modal-body" slot="body">
    <img
      src={`/images/dashboard/${displayedSpending?.icon ?? 'RENT.png'}`}
      alt={displayedSpending?.icon}
    />
    <h1 class="modal-title" style="color:var(--gray)">
      {#if isEn}
        {displayedSpending?.name}{:else}
        {displayedSpending?.spanish_name}
      {/if}
    </h1>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: column; align-content: start; text-align: left;">
        <p style="margin-bottom:.2em;">
          <b
            >{#if isEn}
              Your Monthly Expense{:else}
              Tu Gasto Mensual
            {/if}</b
          >
        </p>
        <p4
          >{#if isEn}Average Migrant Household Expense{:else}
            Gasto Promedio de Hogares Migrantes
          {/if}</p4
        >
      </div>
      <div style="display: flex; flex-direction: column; align-content: end">
        <p style="text-align:right; margin-bottom:.2em;"><b>${displayedSpending?.expense}</b></p>
        <p4 style="text-align:right"><b>${displayedSpending?.avg_migrant_household}</b></p4>
      </div>
    </div>
  </div>
</Modal>

<style>
  #migrant-state {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #expense-board {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;
  }

  #expense-references {
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
    transform-origin: top center;
  }

  .hidden {
    max-height: 0;
    transform: scaleY(0);
    visibility: hidden;
  }

  .visible {
    max-height: 72px;
    transform: scaleY(1);
  }

  #name-board {
    display: flex;
    flex-direction: column;
    justify-content: left;
  }

  #money-board {
    display: flex;
    flex-direction: column;
    justify-content: right;
  }

  section {
    display: flex;
  }

  .oval {
    width: 10px;
    height: 2em;
    background: #f3f3f3;
    border-radius: 40px;
    margin: 1px;
  }

  .oval_filled {
    background: #505050;
  }

  .oval_green {
    background: #7ba522;
  }

  .indicator {
    border: 3px solid;
    width: 4px;
    height: calc(2em - 3px);
  }

  .indicator_rent {
    border-color: var(--light-red);
  }
  .indicator_red {
    border-color: var(--accent-red);
  }
  .indicator_yellow {
    border-color: var(--accent-yellow);
  }
  .indicator_blue {
    border-color: var(--accent-blue);
  }

  @media only screen and (max-height: 750px) {
    .oval {
      height: 1em;
    }

    .indicator {
      height: calc(1em - 5px);
    }
  }

  .alignleft {
    display: flex;
    justify-content: left;
    /* display: flex; */
    /* justify-content: space-between; */
  }
  #alignright {
    display: flex;
    justify-content: right;
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: space-between; */
  }

  :global(#small) {
    font-size: 0.75em;
  }

  #modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 80vw;
    margin-bottom: 1em;
  }

  img {
    width: min(50%, 250px);
  }

  .modal-title {
    font-family: 'sirenia', sans-serif;
    color: #505050;
    margin-block: 3vh;
  }

  /* slider */
  .range-label {
      cursor: pointer;
  }

  .rent-theme {
    --thumb-image: url('/images/dashboard/RENT.png');
  }

  .food-theme {
    --thumb-image: url('/images/dashboard/FOOD_APPLE 2.png');
  }

  .health-theme {
    --thumb-image: url('/images/dashboard/HEALTH.png');
    --thumb-transform: translateY(5px);
  }

  .household-theme {
    --thumb-image: url('/images/dashboard/HOUSEHOLD.png');
    --thumb-transform: translateX(-10px);
  }

  .remittances-theme {
    --thumb-image: url('/images/dashboard/REMITTANCES.png');
    --thumb-transform: translateY(3px);
  }

  .internet-theme {
    --thumb-image: url('/images/dashboard/WIFI.png');
  }

  #modal-button-key {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 14px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
  }

  hr {
    height: 2px;
    background-color: rgba(156, 156, 156, 0.5);
    border: none;
  }
</style>
