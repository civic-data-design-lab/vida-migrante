<script>
  import { fly } from 'svelte/transition';

  import migrantData from '$gameFiles/migrant-data.json';
  import jobData from '$gameFiles/jobs.json';
  import Info from '$lib/components/Info.svelte';

  export let migrantId = null;
  export let jobId = null;
  export let resources = null;

  $: migrantInfo = migrantData.migrants.find((migrant) => migrant.id === migrantId);
  $: jobInfo = jobData.jobs[jobId];
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
      <p>You are <b><i>(food security status)</i></b></p>
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
