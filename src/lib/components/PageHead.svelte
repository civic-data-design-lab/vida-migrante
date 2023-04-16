<script>
  import {
    AUTHOR,
    PREVIEW_IMAGE,
    PREVIEW_IMAGE_SQUARE,
    SITE_TITLE,
    SITE_URL,
    TWITTER_HANDLE,
  } from '$lib/utils/seo';

  export let slug;

  // Language-specific props
  export let metadescription;
  export let ogLanguage;
  export let pageTitle;
</script>

<svelte:head>
  <title>
    {pageTitle ? `${pageTitle} | ` : ''}{SITE_TITLE}
  </title>
  <meta name="description" content={metadescription} />
  <meta
    name="robots"
    content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
  />

  <!-- OpenGraph Properties -->
  <meta property="og:site_name" content={SITE_TITLE} />
  <meta property="og:locale" content={ogLanguage} />
  <meta property="og:url" content="{SITE_URL}/{slug}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metadescription} />
  <meta property="og:image" content={PREVIEW_IMAGE.src} />
  <meta property="og:image:width" content={PREVIEW_IMAGE.width} />
  <meta property="og:image:height" content={PREVIEW_IMAGE.height} />
  <meta property="og:image:alt" content={PREVIEW_IMAGE.alt} />

  <!-- Twitter Properties -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={PREVIEW_IMAGE.src} />
  <meta name="twitter:creator" content={TWITTER_HANDLE} />
  <meta name="twitter:site" content={TWITTER_HANDLE} />
  <meta name="twitter:label1" content="Created by" />
  <meta name="twitter:data1" content={AUTHOR} />
</svelte:head>
