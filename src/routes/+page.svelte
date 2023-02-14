<script>
  import { GameData } from '../store';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<h2>Game State:</h2>
<pre>
<code>
  {JSON.stringify($GameData, null, 4)}
</code>
</pre>
<button on:click={GameData.advanceGameState}>Update state</button>
