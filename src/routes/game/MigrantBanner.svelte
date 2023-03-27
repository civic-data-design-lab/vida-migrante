<script>
  import { fly } from 'svelte/transition';

  import { page } from '$app/stores';
  import Info from '$lib/components/Info.svelte';
  import Profile from '$components/Profile.svelte';
  import { Languages } from '$lib/utils/types';

  export let migrantId = null;
  export let jobId = null;

  $: language = $page.data.language;

  $: migrantInfo = $page.data.migrantData.migrants.find((migrant) => migrant.id === migrantId);
  $: jobInfo = $page.data.jobsData.jobs[jobId];

  $: bannerTitle = [migrantInfo?.name].filter((x) => x).join(', ');
</script>

<span class="migrant-banner" transition:fly={{ y: -200 }}>
  <div class="migrant-banner-content">
    <section style="position: relative;">
      <Info pinned>
        <Profile />
      </Info>
      <img class="migrant-image" src="/images/migrants/{migrantInfo.name}.png" alt="alt" />
    </section>
    <section>
      <h6>{bannerTitle}</h6>
      {#if language == Languages.ENGLISH}
        <p>{migrantInfo.age} Years old, {migrantInfo.maritalStatus}</p>
      {:else}
        <p>{migrantInfo.age} Años, {migrantInfo.maritalStatus}</p>
      {/if}
      <p>{jobInfo.title}</p>
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
