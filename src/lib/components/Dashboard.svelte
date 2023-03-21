<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import RangeSlider from 'svelte-range-slider-pips';
  import Modal from '$components/Modal.svelte';
  import { GameData } from '$gameData';
  import { intros } from 'svelte/internal';
  import { slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import { isFoodSecure, sumValues } from '$lib/utils/functions';
  import { spendings } from '$gameFiles/expenses.json';

  let displayedSpending = null;

  let total_columns = 55;
  let max_expense = 800;

  let player_expenses = 200;
  let player_income = $GameData.resources?.income.salary;

  // Get the migrant's food security status
  $: migrantInfo = $page.data.migrantData.migrants.find(
    (migrant) => migrant.id === $GameData.migrantId
  );
  let foodSecurityStatus;
  $: {
    console.debug('Calculating food security');
    const foodSecure = isFoodSecure(
      sumValues($GameData.resources.expenditures),
      migrantInfo.householdSize
    );
    foodSecurityStatus = foodSecure ? 'Food Secure' : 'Food Insecure';
  }

  //create the oval charts
  let expenses = [];
  for (let i = 0; i < total_columns; i++) {
    if (i < Math.ceil((total_columns * player_expenses) / max_expense)) {
      expenses.push('oval_filled');
    } else if (i == Math.ceil((total_columns * player_income) / max_expense)) {
      expenses.push('oval_green');
    } else if (i == 54) {
      expenses.push('oval_red');
    } else if (i == 37) {
      //$540*55/800
      expenses.push('oval_yellow');
    } else if (i == 52) {
      expenses.push('oval_blue');
    } else {
      expenses.push('oval');
    }
  }

  let initial_expenses = [];
  for (let i = 1; i <= 30; i++) {
    initial_expenses.push(0);
  }
  for (let spending of spendings) {
    // spending.expense = $GameData.resources?.expenses;
    // spending.name
    spending.expense = 50;
  }

  //slider
  let slider_theme = 'default';

  function onChangeExpense(spending, value) {
    console.log('changel, ', spending, value);
    //update total expenses
    spending.expense = value;
    player_expenses = 0;
    for (let item of spendings) {
      player_expenses += item.expense;
    }
  }

  function updateChart() {
    player_expenses = 0;
    for (let item of spendings) {
      player_expenses += item.expense;
    }
    // let expenses = [];
    for (let i = 0; i < total_columns; i++) {
      if (i < Math.ceil((total_columns * player_expenses) / max_expense)) {
        if (i == Math.ceil((total_columns * player_income) / max_expense)) {
          expenses[i] = 'oval_filled_green';
        } else if (i == 54) {
          expenses[i] = 'oval_filled_red';
        } else if (i == 37) {
          //$540*55/800
          expenses[i] = 'oval_filled_yellow';
        } else if (i == 52) {
          expenses[i] = 'oval_filled_blue';
        } else {
          expenses[i] = 'oval_filled';
        }
      } else if (i == Math.ceil((total_columns * player_income) / max_expense)) {
        expenses[i] = 'oval_green';
      } else if (i == 54) {
        expenses[i] = 'oval_red';
      } else if (i == 37) {
        //$540*55/800
        expenses[i] = 'oval_yellow';
      } else if (i == 52) {
        expenses[i] = 'oval_blue';
      } else {
        expenses[i] = 'oval';
      }
    }
  }
</script>

<div id="migrant-state">
  <span>You work {$GameData.resources.time} hours weekly</span>
  <span>You are {foodSecurityStatus}</span>
</div>
<div style="display: flex; flex-direction: row; align-content: center; justify-content: center;">
  <section>
    {#each expenses as color}
      <!-- <h4>{color}</h4> -->
      <div id={color} />
    {/each}
  </section>
</div>
<div id="expense-board">
  <div id="name-board">
    <div class="alignleft">
      <div class="circle" style="background-color: #505050" />
      <p2 style="color: #505050; font-weight: bold;">Your Total Expenses</p2>
    </div>
    <div class="alignleft">
      <div class="circle" style="background-color: green" />
      <p2 style="color: green; font-weight: bold;">Your Income</p2>
    </div>
    <div class="alignleft">
      <div class="circle" style="background-color: gray" />
      <p2 style="color: #505050;">Average Migrant Household Income</p2>
    </div>
    <div class="alignleft">
      <div class="circle" style="background-color: #CF6348" />
      <p2 style="color: #CF6348;">Average Ecuadorian Income</p2>
    </div>
    <div class="alignleft">
      <div class="circle" style="background-color: #E5B257" />
      <p2 style="color: #E5B257;">Ecuadorian Vital Family Basket</p2>
    </div>
    <div class="alignleft">
      <div class="circle" style="background-color: #5273B0" />
      <p2 style="color: #5273B0;">Ecuadorian Basic Family Basket</p2>
    </div>
  </div>
  <div id="money-board">
    <p3 style="color: #505050; float: right; font-weight: bold;">
      ${player_expenses}
    </p3>
    <p3 style="color: green; float: right; font-weight: bold;">
      <span>${player_income}</span>
    </p3>
    <p3 class="alignright" style="color: gray; float: right;">
      <span>$326</span>
    </p3>
    <p3 class="alignright" style="color: #CF6348; float: right;">
      <span>$793</span>
    </p3>
    <p3 class="alignright" style="color: #E5B257; float: right;">
      <span>$540</span>
    </p3>
    <p3 class="alignright" style="color: #5273B0; float: right;">
      <span>$765</span>
    </p3>
  </div>
</div>

<div
  style="display: flex; flex-direction: column; align-content: center; justify-content: center; padding: 1em"
>
  <h3>Allocate Your Spending</h3>
  {#each spendings as spending (spending.name)}
    <section>
      <!-- <div id="container2"> -->
      <p>{(slider_theme = spending.name)}</p>
      <button
        class="info"
        on:click={() => (displayedSpending = spending)}
        style="
          width: 1.5em;
          height: 1.5em;
          color: white;
          margin-top: 1.5em;
          margin-left: .5em;
          background-color: #505050;
          -webkit-border-radius:.75em;
          -moz-border-radius:.75em;
          border-radius:.75em;"
        >?
      </button>
    </section>
    <div
      class:rent-theme={spending.name === 'Rent'}
      class:food-theme={spending.name === 'Food'}
      class:health-theme={spending.name === 'Health & Hygiene'}
      class:household-theme={spending.name === 'Household & Utilities'}
      class:remittances-theme={spending.name === 'Remittances'}
      class:internet-theme={spending.name === 'Internet'}
    >
      <Range
        on:change={(e) => {
          spending.expense = e.detail.value;
          updateChart();
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
    <h2>{displayedSpending?.name}</h2>
    <div style="display: flex; flex-direction: row;">
      <div style="display: flex; flex-direction: column; align-content: left; text-align: left;">
        <p>Your Expense</p>
        <body2>Average Migrant Household Expense</body2>
        <body2>Average National Expense</body2>
      </div>
      <div style="display: flex; flex-direction: column; align-content: right;">
        <p>${displayedSpending?.expense}</p>
        <body2>$326</body2>
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

  span {
    font-family: var(--font-sirenia);
    font-size: 14pt;
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
    margin-top: 1em;
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

  #oval {
    width: 0.25em;
    height: 2.9em;
    background: lightgray;
    border-radius: 40px;
    margin: 1px;
  }
  #oval_green {
    width: 0.25em;
    height: 2.9em;
    background: green;
    border-radius: 40px;
    margin: 1px;
  }
  #oval_red {
    width: 0.25em;
    height: 2.9em;
    background: #cf6348;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  #oval_yellow {
    width: 0.25em;
    height: 2.9em;
    background: #e5b257;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  #oval_blue {
    width: 0.25em;
    height: 2.9em;
    background: #5273b0;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }
  #oval_filled {
    width: 0.25em;
    height: 2.9em;
    background: #505050;
    border-radius: 40px;
    margin: 1px;
  }
  #oval_filled_green {
    width: 0.25em;
    height: 2.9em;
    background: green;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
  }
  #oval_filled_red {
    width: 0.25em;
    height: 2.9em;
    background: #cf6348;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  #oval_filled_yellow {
    width: 0.25em;
    height: 2.9em;
    background: #e5b257;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  #oval_filled_blue {
    width: 0.25em;
    height: 2.9em;
    background: #5273b0;
    box-shadow: 0 0 0.1em #505050;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }
  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 0.3em;
    margin-right: 0.5em;
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
  }

  /* slider */
  .rent-theme {
    --thumb-image: url('/images/dashboard/RENT.png');
  }

  .food-theme {
    --thumb-image: url('/images/dashboard/EGGS_FOOD_1.png');
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
</style>
