<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import RangeSlider from "svelte-range-slider-pips";
  import Modal from '$components/Modal.svelte';
  import { GameData } from '$gameData';
  import { intros } from 'svelte/internal';

  let displayedSpending = null;

  let total_columns = 55;
  let max_expense = 800; 

  let player_expenses = 200;
  let player_income = $GameData.resources?.income.salary

  //create the oval charts
  let expenses = [];
  for (let i = 0; i <total_columns; i++) {
    if (i < Math.ceil(total_columns*player_expenses/max_expense)) {
      expenses.push("oval_filled");
      } else if (i == Math.ceil(total_columns*player_income/max_expense)) {
        expenses.push("oval_green");
      } else if (i==54) {
        expenses.push("oval_red");
      } else if (i == 37) { //$540*55/800
        expenses.push("oval_yellow");
      } else if (i == 52) {
        expenses.push("oval_blue");
      } else {
        expenses.push("oval");
      }
    }
    
  let initial_expenses = [];
  for (let i = 1; i <= 30; i++) {
    initial_expenses.push(0);
  }
  let spendings = [
    {
      name: 'Rent',
      icon: 'RENT.png',
      expense: 2,
    },
    {
      name: 'Food',
      icon: 'FOOD3.png',
      expense: 10,
    },
    {
      name: 'Health & Hygiene',
      icon: 'HEALTH.png',
      expense: 20,
    },
    {
      name: 'Household & Utilities',
      icon: 'HOUSEHOLD.png',
      expense: 100,
    },

    {
      name: 'Remittances',
      icon: 'REMITTANCES.png',
      expense: 0,
    },
    {
      name: 'Internet',
      icon: 'INTERNET.png',
      expense: 0,
    },
  ];
  // player_expenses = 0;
  // for (let item of spendings) {
  //   player_expenses += item.expense;
  // }

  function onChangeExpense(spending, value) {
    console.log("changel, ", spending, value)
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
  for (let i = 0; i <total_columns; i++) {
    if (i < Math.ceil(total_columns*player_expenses/max_expense)) {
      expenses[i]="oval_filled";
      } else if (i == Math.ceil(total_columns*player_income/max_expense)) {
        expenses[i]="oval_green";
      } else if (i==54) {
        expenses[i]="oval_red";
      } else if (i == 37) { //$540*55/800
        expenses[i]="oval_yellow";
      } else if (i == 52) {
        expenses[i]="oval_blue";
      } else {
        expenses[i]="oval";
      }
    }

  }

</script>

<div style="display: flex; flex-direction: row; align-content: center; justify-content: center;">
    <section>
    {#each expenses as color }
      <!-- <h4>{color}</h4> -->
      <div id={color}></div>
    {/each}
  </section>
</div>
  <div id="container2">
    <div class="circle" style="background-color: #505050"></div>
    <p2 style="color: #505050; font-weight: bold;">Your Total Expenses</p2>
    <p3 class="alignright" style="color: #505050; float: right; font-weight: bold;">
    <span>${player_expenses}</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="background-color: green"></div>
    <p2 style="color: green; font-weight: bold;">Your Income</p2>
    <p3 class="alignright" style="color: green; float: right; font-weight: bold;">
    <span>${player_income}</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="background-color: gray"></div>
    <p2 style="color: #505050;">Average Migrant Household Income</p2>
    <p3 class="alignright" style="color: gray; float: right;">
    <span>$326</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="background-color: #CF6348"></div>
    <p2 style="color: #CF6348;">Average Ecuadorian Income</p2>
    <p3 class="alignright" style="color: #CF6348; float: right;">
    <span>$793</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="background-color: #E5B257"></div>
    <p2 style="color: #E5B257;">Ecuadorian Vital Family Basket</p2>
    <p3 class="alignright" style="color: #E5B257; float: right;">
    <span>$540</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="background-color: #5273B0"></div>
    <p2 style="color: #5273B0;">Ecuadorian Basic Family Basket</p2>
    <p3 class="alignright" style="color: #5273B0; float: right;">
    <span>$765</span>
    </p3>
  </div>
  <div style="display: flex; flex-direction: column; align-content: center; justify-content: center; padding: 1em">
    <h3>Allocate Your Spending</h3>
  <body>Total Proposed Spending</body>
  <body>{spendings[0].expense+spendings[1].expense+spendings[2].expense+spendings[3].expense+spendings[4].expense+spendings[5].expense}</body>
  <!-- <button on:click={() => updateChart()}>Update Expenses</button> -->
  {#each spendings as spending}
    <section>
      <!-- <div id="container2"> -->
        <p>{spending.name}</p>
        <button class = "info" on:click={() => (displayedSpending = spending)}
          style="
          width: 1.5em;
          height: 1.5em;
          color: white;
          margin-top: 1.5em;
          margin-left: .5em;
          background-color: #505050;
          -webkit-border-radius:.75em;
          -moz-border-radius:.75em;
          border-radius:.75em;">?
        </button>
        <p>${spending.expense}</p>
    </section>
    <Range on:change={
      (e) => {
        spending.expense = e.detail.value; 
        updateChart();
      }
        }
          min={0}
          max={200}
          value={spending.expense}
          label={true}
          color="green"
        ></Range>
            <!-- <Range on:change={(e) => onChangeExpense(spending, e.detail.value)} -->
  {/each}
</div>



<Modal showModal={displayedSpending}>
  <div id="modal-body" slot="body">
    <img
      src="/src/lib/assets/images/dashboard/{displayedSpending?.icon}"
      alt={displayedSpending?.name}
    />
    <div>
      <h2>{displayedSpending?.name}</h2>
      <p>Your Expense</p>
      <p>Average Migrant Household Expense</p>
      <p>Average National Expense</p>
    </div>
  </div>
</Modal>


<style>
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
    justify-content: space-between;
    
  }

  section {
    display: flex;
  }

  #oval {
      width: 5px;
      height: 75px;
      background: lightgray;
      border-radius: 40px;
      margin: 1px;
  }
  #oval_green {
    width: 5px;
    height: 75px;
    background: green;
    border-radius: 40px;
    margin: 1px;
  }
  #oval_red {
    width: 5px;
    height: 75px;
    background:#CF6348;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  #oval_yellow {
    width: 5px;
    height: 75px;
    background: #E5B257; ;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  #oval_blue {
    width: 5px;
    height: 75px;
    background: #5273B0;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }
  #oval_filled {
    width: 5px;
    height: 75px;
    background: #505050;
    border-radius: 40px;
    margin: 1px;
  }
  .circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 1px;
    margin-left: 10%;
  }

  .alignleft {
	float: left;
  display: flex;
  justify-content: space-between;
  } 
  .alignright {
    float: right;
    display: flex;
    justify-content: space-between;
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
	
</style>
