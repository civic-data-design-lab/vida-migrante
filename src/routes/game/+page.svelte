<script>
  import { GameData } from '$gameData';
  import { GameStates } from '$types';
  import DecisionPage from './DecisionPage.svelte';

  $: state = $GameData.state;
  $: migrant = $GameData.migrant;
  let round = 1;

  function advanceState() {
    if (state === GameStates.DECISION) round++;
    GameData.advanceGameState();
  }
</script>

<div id="container">
  {#if state === GameStates.START}
    <h1>START</h1>
  {:else if state === GameStates.MIGRANT_SELECT}
    <h1>Who are the migrants?</h1>
    <button
      on:click={() => {
        GameData.selectMigrant({ name: 'Carlos' });
      }}>Select</button
    >
  {:else if state === GameStates.JOB_SELECT}
    <h1>
      What does {migrant?.name} do?
    </h1>
  {:else if state === GameStates.INSTRUCTIONS}
    <h1>Instructions</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Scelerisque in dictum non consectetur. Vel fringilla est
      ullamcorper eget nulla facilisi etiam dignissim. Sit amet massa vitae tortor condimentum
      lacinia quis vel eros. Et pharetra pharetra massa massa ultricies mi quis hendrerit. In
      iaculis nunc sed augue. Lectus nulla at volutpat diam ut. Nisl nisi scelerisque eu ultrices.
      Et leo duis ut diam quam nulla porttitor. Porttitor eget dolor morbi non arcu risus quis.
      Magna ac placerat vestibulum lectus mauris ultrices. Vestibulum morbi blandit cursus risus. Mi
      ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Natoque penatibus et magnis dis
      parturient montes. Augue mauris augue neque gravida in fermentum et sollicitudin. Sit amet
      tellus cras adipiscing enim eu. Diam volutpat commodo sed egestas egestas fringilla. Pharetra
      vel turpis nunc eget lorem dolor sed viverra ipsum.
    </p>
    <button on:click={GameData.advanceGameState}>Begin</button>
  {:else if state === GameStates.ROUND_START}
    <h1>
      ROUND {round} START
    </h1>
  {:else if state === GameStates.INCOME}
    <h1>INCOME</h1>
  {:else if state === GameStates.EXPENSES}
    <h1>EXPENSES</h1>
  {:else if state === GameStates.DRAW_CARD}
    <h1>DRAW CARD</h1>
  {:else if state === GameStates.DECISION}
    <h1>DECISION</h1>
    <DecisionPage />
  {/if}
</div>

<div id="game">
  <h2>Game State:</h2>
  <pre>
        <code>
            {JSON.stringify($GameData, null, 4)}
        </code>
    </pre>
  <button on:click={advanceState}>Update state</button>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 2.5vw;
  }

  #game {
    padding: 5vw;
  }
</style>
