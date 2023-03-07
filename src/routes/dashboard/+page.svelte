<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import RangeSlider from "svelte-range-slider-pips";
  import Modal from '$components/Modal.svelte';
  import { GameData } from '$gameData';
  import { intros } from 'svelte/internal';

  let showModal = false;
  let displayedSpending = null;
  let values = [0,200];

  let total_columns = 55;
  let max_expense = 800; 

  let player_expenses = 200;
  let player_income = $GameData.resources?.income.salary

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
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
    {
      name: 'Food',
      icon: 'FOOD3.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
    {
      name: 'Health & Hygiene',
      icon: 'HEALTH.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
    {
      name: 'Household & Utilities',
      icon: 'HOUSEHOLD.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },

    {
      name: 'Remittances',
      icon: 'REMITTANCES.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
    {
      name: 'Internet',
      icon: 'INTERNET.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
  ];
  function add(accumulator, a) {
    return accumulator + a;
  }
  function addExpense(expense) {
    expense[0]++;
    console.log(expense);
    return;
  }

  let value = 42;
  
  //'.info'.popover();
</script>
<div id="container">
    <div id="container2">
      <h3 class="alignleft">Your Total Expense</h3>
      <h3 class="alignright">${player_expenses}</h3>
    </div>
    <section>
    {#each expenses as color }
      <!-- <h4>{color}</h4> -->
      <div class={color}></div>
    {/each}
  </section>
  <div id="container2">
    <div class="circle"></div>
    <p2 style="color: #505050; font-weight: bold;">Your Total Expenses</p2>
    <p3 class="alignright" style="color: #505050; float: right; font-weight: bold;">
    <span>${player_expenses}</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle"></div>
    <p2 style="color: green; font-weight: bold;">Your Income</p2>
    <p3 class="alignright" style="color: green; float: right; font-weight: bold;">
    <span>${player_income}</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle"></div>
    <p2 style="color: #505050;">Average Migrant Household Income</p2>
    <p3 class="alignright" style="color: #505050; float: right;">
    <span>$326</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="border: 3px solid #CF6348"></div>
    <p2 style="color: #CF6348;">Average Ecuadorian Income</p2>
    <p3 class="alignright" style="color: #CF6348; float: right;">
    <span>$793</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="border: 3px solid #E5B257"></div>
    <p2 style="color: #E5B257;">Ecuadorian Vital Family Basket</p2>
    <p3 class="alignright" style="color: #E5B257; float: right;">
    <span>$540</span>
    </p3>
  </div>
  <div id="container2">
    <div class="circle" style="border: 3px solid #5273B0"></div>
    <p2 style="color: #5273B0;">Ecuadorian Basic Family Basket</p2>
    <p3 class="alignright" style="color: #5273B0; float: right;">
    <span>$765</span>
    </p3>
  </div>
  
    
  <h3>Household Spending</h3>
  <body
    >slide to allocate your income</body
  >
  {#each spendings as spending}
    <section>
      <div id="container2">
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
      </div>
      <!-- <div> -->
        <!-- <label for="basic-range">{spending.name}</label>  -->
        <!-- <Range on:change={(e) => value = e.detail.value} id="basic-slider"/> -->
        <!-- <RangeSlider style="fontsize: 20px;" min={0} max={200} /> -->
        
      <!-- </div> -->
      
      
    </section>
    <!-- <RangeSlider style="fontsize: 20px;" min={0} max={200} /> -->
    <RangeSlider id=small bind:values range float all="label" step={10} />

  {/each}
</div>

<Modal showModal={displayedSpending}>
  <div class="modal-body" slot="body">
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

  .oval {
      width: 5px;
      height: 75px;
      background: lightgray;
      border-radius: 40px;
      margin: 1px;
  }
  .oval_green {
    width: 5px;
    height: 75px;
    background: green;
    border-radius: 40px;
    margin: 1px;
  }
  .oval_red {
    width: 5px;
    height: 75px;
    background:#CF6348;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #CF6348; */
  }
  .oval_yellow {
    width: 5px;
    height: 75px;
    background: #E5B257; ;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #E5B257; */
  }
  .oval_blue {
    width: 5px;
    height: 75px;
    background: #5273B0;
    border-radius: 40px;
    margin: 1px;
    /* border: 1.5px solid #5273B0; */
  }
  .oval_filled {
    width: 5px;
    height: 75px;
    background: #505050;
    border-radius: 40px;
    margin: 1px;
  }
  .circle {
    width: 12px;
    height: 12px;
    background: #f3f3f3;
    border-radius: 50%;
    margin: 1px;
    border: 3px solid #505050;
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
	
</style>
