<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import Modal from '$components/Modal.svelte';
  import { GameData } from '$gameData';
  import { page } from '$app/stores';
  import { isFoodSecure, sumValues } from '$lib/utils/functions';
  import { spendings } from '$gameFiles/expenses.json';
  import { Languages, RESOURCE_UPDATE_ANIM_DURATION } from '$lib/utils/types';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';

  const migrants = $page.data.migrantData.migrants;

  $: language = $page.data.language;
  $: isEn = language === Languages.ENGLISH;

  $: playerExpenses = parseInt(sumValues($GameData.resources?.expenditures));
  $: playerIncome = $GameData.resources?.income.salary + $GameData.resources?.income.assistance;
  $: hoursWorked = $GameData.resources?.time;

  const animatedPlayerExpenses = tweened(playerExpenses, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: cubicOut,
  });

  const animatedPlayerIncome = tweened(playerIncome, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: cubicOut,
  });
  const animatedHoursWorked = tweened(hoursWorked, {
    duration: RESOURCE_UPDATE_ANIM_DURATION,
    easing: cubicOut,
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
  const total_columns = 55;
  const max_expense = 850;
  let expenses = new Array(total_columns).fill('oval');
  $: columns = Math.floor((total_columns * $animatedPlayerExpenses) / max_expense);
  $: income_column = Math.ceil((total_columns * $animatedPlayerIncome) / max_expense);
  $: expenses = expenses.map((_, i) => {
    let ovalClass = 'oval';
    switch (i) {
      case income_column:
        ovalClass += '_green';
        break;
    }
    if (i <= columns) ovalClass += '_filled';
    return ovalClass;
  });
  let indicators = new Array(total_columns).fill('indicator');
  $: indicators = indicators.map((_, i) => {
    let indicatorClass = 'indicator';
    switch (i) {
      case 20: //313*55/850 avg migrant income
        indicatorClass += '_gray';
        break;
      case 54: //840*55/850 avg ecuadorian incomee
        indicatorClass += '_red';
        break;
      case 35: //540*55/850 vital family basket
        indicatorClass += '_yellow';
        break;
      case 49: //761*55/850 basic family basket
        indicatorClass += '_blue';
    }
    return indicatorClass;
  });

  //slider
  let slider_theme = 'default';
  for (let spending of spendings) {
    spending.expense = $GameData.resources?.expenditures[spending.name2];
  }

  let expenseReferences = false;
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
  <section>
    {#each indicators as indicator_color}
      <div class={indicator_color} />
    {/each}
  </section>
</div>
<div id="migrant-state">
  {#if isEn}
    <p4 style="width:100%; font-weight: 500; font-size: 11pt; margin-top:.5rem; text-align:left;"
      >You work <b><i>{Math.floor($animatedHoursWorked)}</i></b> hours a week & you are
      <b><i>{foodSecurityStatus}</i></b>.</p4
    >
  {:else}
    <p4 style="font-weight: 500; font-size: 11pt; margin-top:.5rem; text-align:left;"
      >Trabajas <b><i>{Math.floor($animatedHoursWorked)}</i></b> horas a la semana & tienes
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
        <p4 style="color: #505050;"
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
      <p4 class="alignright" style="color: #505050; float: right;"> $313 </p4>
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
        <p4 style="font-size:9pt;   text-decoration-line: underline;"
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

  #container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding: 2.5vw;
  }

  #container2 {
    display: flex;
    /* justify-content: space-between; */
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
    width: 0.25em;
    height: 2em;
    background: #f3f3f3;
    border-radius: 40px;
    margin: 1px;
  }
  .oval_green {
    width: 0.25em;
    height: 2em;
    background: #7ba522;
    border-radius: 40px;
    margin: 1px;
  }
  .oval_red {
    width: 0.25em;
    height: 2em;
    background: #cf6348;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  .oval_yellow {
    width: 0.25em;
    height: 2em;
    background: #e5b257;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  .oval_blue {
    width: 0.25em;
    height: 2em;
    background: #5273b0;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }
  .oval_filled {
    width: 0.25em;
    height: 2em;
    background: #505050;
    border-radius: 40px;
    margin: 1px;
  }
  .oval_green_filled {
    width: 0.25em;
    height: 2em;
    background: #7ba522;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
  }
  .oval_red_filled {
    width: 0.25em;
    height: 2em;
    background: #cf6348;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  .oval_yellow_filled {
    width: 0.25em;
    height: 2em;
    background: #e5b257;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  .oval_blue_filled {
    width: 0.25em;
    height: 2em;
    background: #5273b0;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }

  .indicator {
    width: 0.25em;
    height: 0.55em;
    background-color: transparent;
    margin: 1px;
    margin-top: 4px;
  }
  .indicator_gray {
    width: 0.25em;
    height: 0.55em;
    background: #9c9c9c;
    margin: 1px;
    margin-top: 4px;
  }
  .indicator_red {
    width: 0.25em;
    height: 0.55em;
    background: #cf6348;
    margin: 1px;
    margin-top: 4px;
  }
  .indicator_yellow {
    width: 0.25em;
    height: 0.55em;
    background: #e5b257;
    margin: 1px;
    margin-top: 4px;
  }
  .indicator_blue {
    width: 0.25em;
    height: 0.55em;
    background: #5273b0;
    margin: 1px;
    margin-top: 4px;
  }

  /* .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 0.3em;
    margin-right: 0.5em;
  } */

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
    width: 50%;
  }

  .modal-title {
    font-family: 'sirenia', sans-serif;
    color: #505050;
    margin-block: 3vh;
  }

  /* slider */
  .rent-theme {
    --thumb-image: url('/images/dashboard/RENT.png');
  }

  .food-theme {
    --thumb-image: url('/images/dashboard/EGGS_FOOD_2.png');
  }

  .health-theme {
    --thumb-image: url('/images/dashboard/HEALTH.png');
  }

  .household-theme {
    --thumb-image: url('/images/dashboard/HOUSEHOLD.png');
  }

  .remittances-theme {
    --thumb-image: url('/images/dashboard/REMITTANCES.png');
  }

  .internet-theme {
    --thumb-image: url('/images/dashboard/WIFI.png');
  }

  #bars {
    width: 85%;
    display: flex;
    flex-direction: row;
    place-content: center;
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
