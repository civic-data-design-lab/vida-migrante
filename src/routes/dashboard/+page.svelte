<script>
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
</script>

<div id="container">
  <h2>Household Spending</h2>
  <p1
    >Add a number or tap on the coin to decide the amount of income you want to spend in each
    category. Each coin represents $5.</p1
  >
  {#each spendings as { name, icon, total_expense, expenses }}
    <section>
      <img src={icon} style="width:3.5em; height: 3.5em; padding: 25px" alt={name} />
      <button class="button button4">${total_expense}</button>
      <div class="grid-container">
        {#each expenses as { expense }}
          <div class="grid-item">
            <button class="button button5" on:click={addExpense(expense)} />
          </div>
        {/each}
      </div>
    </section>
  {/each}
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding: 2.5vw;
  }
  section {
    display: flex;
  }
</style>
