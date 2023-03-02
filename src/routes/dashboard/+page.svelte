<script>
  import { onMount } from 'svelte';
  import Range from '$components/Range.svelte';
  import Modal from '$components/Modal.svelte';

  let showModal = false;

  let expenses = [];
  for (let i = 0; i <60; i++) {
    if (i < 24) {
      expenses.push("oval_filled");
    } else {
      if (i==59) {
        expenses.push("oval_red");
      } else if (i == 40) { //$540*60/800
        expenses.push("oval_yellow");
      } else if (i == 57) {
        expenses.push("oval_blue");
      } else {
        expenses.push("oval");
      }
    }
    
    
  }

  let initial_expenses = [];
  for (let i = 1; i <= 30; i++) {
    initial_expenses.push(0);
  }
  let spendings = [
    {
      name: 'Rent',
      icon: '/src/lib/assets/images/dashboard/RENT.png',
      total_expense: initial_expenses.reduce(add, 0),
      expenses: initial_expenses,
    },
    {
      name: 'Food',
      icon: '/src/lib/assets/images/dashboard/FOOD.png',
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
      <h3 class="alignright">$324</h3>
    </div>
    <section>
    {#each expenses as color }
      <!-- <h4>{color}</h4> -->
      <div class={color}></div>
    {/each}
  </section>
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
  {#each spendings as { name, icon, total_expense, expenses }}
    <section>
      
      <img src={icon} style="width:3.5em; height: 3.5em; padding: 25px" alt={name} />
      <h2>{name}</h2>
      <button class = "info" on:click={() => (showModal = true)}>
        i
      </button>

      <div>
        <label for="basic-range">{name}</label>
        <!-- <Range on:change={(e) => value = e.detail.value} id="basic-slider" /> -->
      </div>
      
      
    </section>
  {/each}
</div>

<Modal bind:showModal>
	<h2>
		modal
	</h2>
  <img src={'/src/lib/assets/images/dashboard/FOOD.png'} style="width:3.5em; height: 3.5em; padding: 25px" alt="FOOD" />
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
  .oval_red {
    width: 5px;
    height: 75px;
    background: lightgray;
    border-radius: 40px;
    margin: 1px;
    border: 1.5px solid #CF6348;
  }
  .oval_yellow {
    width: 5px;
    height: 75px;
    background: lightgray;
    border-radius: 40px;
    margin: 1px;
    border: 1.5px solid #E5B257;
  }
  .oval_blue {
    width: 5px;
    height: 75px;
    background: lightgray;
    border-radius: 40px;
    margin: 1px;
    border: 1.5px solid #5273B0;
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

  
</style>
