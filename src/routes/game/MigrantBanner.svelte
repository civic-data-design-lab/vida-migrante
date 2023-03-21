<script>
  import { fly } from 'svelte/transition';

  import { page } from '$app/stores';
  import Info from '$lib/components/Info.svelte';
  import { isFoodSecure, sumValues } from '$lib/utils/functions';
  import { GameData } from '$lib/stores/gameData';

  export let migrantId = null;
  export let jobId = null;
  export let resources = null;

  $: migrantInfo = $page.data.migrantData.migrants.find((migrant) => migrant.id === migrantId);
  $: jobInfo = $page.data.jobsData.jobs[jobId];

  let foodSecurityStatus;
  $: {
    const foodSecure = isFoodSecure(
      sumValues($GameData.resources.expenditures),
      migrantInfo.householdSize
    );
    foodSecurityStatus = foodSecure ? 'Food Secure' : 'Food Insecure';
  }
  $: bannerTitle = [migrantInfo?.name, migrantInfo?.age, jobInfo?.title]
    .filter((x) => x)
    .join(', ');
</script>

<span class="migrant-banner" transition:fly={{ y: -200 }}>
  <div class="migrant-banner-content">
    <section style="position: relative;">
      <Info pinned>
        <h1>More migrant info</h1>
      </Info>
      <img class="migrant-image" src="/images/migrants/{migrantInfo.name}.png" alt="alt" />
    </section>
    <section>
      <h6>{bannerTitle}</h6>
      <p>You are working <b><i>{resources.time}</i></b> hours daily.</p>
      <p>You are <b><i>{foodSecurityStatus}</i></b></p>
    </section>
  </div>
</span>

<style>
  .migrant-banner {
    position: absolute;
    width: 100%;
    top: 57px;
  }

  .migrant-banner-content {
    display: flex;
    gap: 1rem;
    padding: 0 32px;
  }

  .migrant-image {
    width: 52px;
    height: 52px;
  }

  p {
    margin: 0;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
  }
</style>
