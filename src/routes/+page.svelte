<script>
    const lastPage = 2;
    let page = 0;
    function advancePage() {
        if (page === lastPage) ; // navigate to game page
        else page++;
    }
</script>

<div id="container">
    {#if !page}
        <h1>Welcome</h1>
        <p>
            We will take you through the journey and struggles
            of Venezuelan migrants in Ecuador
        </p>
    {:else if page === 1}
        <p>
            When migrants arrive in Ecuador, they face multiple
            challenges including:
        </p>
        <ol>
            <li>Barriers to integration for migrants</li>
            <li>
                Trade-offs the migrants have to make to meet their
                basic daily needs
            </li>
            <li>
                How support and assistances (food, access to internet,
                and legalization of documents) can help change migrants'
                outcomes
            </li>
        </ol>
    {:else if page === 2}
        <p>
            In this game you will learn about the struggles of the
            Venezuelan migrants in Ecuador, how they face them, and how
            certain assistances can help them through their integration
            process in Ecuador.
        </p>
        <p>
            The goal of them game is to go through each one of the four
            rounds, which is an entire year, by using as few coping strategies
            as possible, while maintaining some money, time, and wellness.
        </p>
    {/if}
<button on:click={advancePage}>
    {#if page === lastPage}
        Start
    {:else}
        Next
    {/if}
</button>

{#if page === lastPage}
    <a href="/dashboard">Explore the data</a>
{/if}
</div>

<style>
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 2.5vw;
    }

    button {
        position: fixed;
        margin: auto;
        bottom: 25vh;
    }

    a {
        color: black;
        margin: auto;
        position: fixed;
        bottom: 7vh;
    }
</style>