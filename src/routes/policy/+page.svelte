<script>
  import BackButton from '$lib/components/BackButton.svelte';
  import { Languages } from '$lib/utils/types';
  import PageHead from '$lib/components/PageHead.svelte';

  export let data;
  $: language = data.language;
</script>

<PageHead {...data.seoProps} />

<header class="fixed-header">
  <BackButton />
</header>
<div id="container" class="constrained">
  {#if language == Languages.ENGLISH}
    <h1 id="policy-title">Recommendations from our Study</h1>
  {:else}
    <h1 id="policy-title">Recomendaciones del Estudio</h1>
  {/if}

  <div id="policy-body">
    {#if language == Languages.ENGLISH}
      <p>
        From the conducted study, 5 general key points have been identified to promote an
        improvement in the lives of migrants.
      </p>
    {:else}
      <p>
        Desde el estudio realizado, se han identificado 5 puntos generales clave para propiciar una
        mejora en la vida de los/as personas migrantes.
      </p>
    {/if}
    <h1>1</h1>
    {#if language == Languages.ENGLISH}
      <p>
        <b>Regularization of Documents</b><br />
        Regularization of immigration documents and recognition of accreditations aan help improve migrants’
        employment or working conditions, and access to financial services.
      </p>
    {:else}
      <p>
        <b>Regularización de Documentos</b><br />
        Expandir la regularización de documentos migratorios y el reconocimiento de acreditaciones pueden
        ayudar a mejorar el empleo o las condiciones de trabajo y el acceso a los servicios financieros.
      </p>
    {/if}
    <h1>2</h1>
    {#if language == Languages.ENGLISH}
      <p>
        <b>Skills</b><br />
        Many migrants struggle to find a job that matches their skills, better connections should be
        made between the skills immigrants bring with them and the potential job market in Ecuador.
      </p>
    {:else}
      <p>
        <b>Habilidades</b><br />
        Las personas migrantes luchan por encontrar un trabajo que coincida con sus habilidades; se deben
        hacer mejores conexiones entre las habilidades que los migrantes traen consigo y el mercado laboral
        potencial en Ecuador.
      </p>
    {/if}
    <h1>3</h1>
    {#if language == Languages.ENGLISH}
      <p>
        <b>Training and Internet</b><br />
        Migrants are able to contribute to the economy, but they lack training and stable access to the
        internet, finding ways to provide better access to internet services and training could help.
      </p>
    {:else}
      <p>
        <b>Capacitación e Internet</b><br />
        Las personas migrantes pueden contribuir al desarrollo de las economías digitales, pero carecen
        de ca- pacitación y acceso estable a Internet; es necesario hallar formas de brindar un mejor
        acceso a los servicios de Internet y la capacitación para ayudarles.
      </p>
    {/if}
    <h1>4</h1>
    {#if language == Languages.ENGLISH}
      <p>
        <b>Informal Sector</b><br />
        The Ecuador economy is 51% informal which means that to help migrants in Ecuador we must also
        help the Ecuadorian economy. Programs available for Migrants should also be available for Ecuadorian.
      </p>
    {:else}
      <p>
        <b>Sector Informal</b><br />
        La economía ecuatoriana es 51% informal lo que significa que para ayudar a las personas migrantes
        en Ecuador también debemos ayudar a la economía ecuatoriana. Los programas disponibles para migrantes
        también deberían estar disponibles para ecuatorianos.
      </p>
    {/if}
    <h1>5</h1>
    {#if language == Languages.ENGLISH}
      <p>
        <b>Digital Economy</b><br />
        Migrants are willing to learn skills needed for the digital economy programs should be developed
        for both Venezuelan and Ecuadorian living in Ecuador to help increase their ability to work within
        this service economy.
      </p>
    {:else}
      <p>
        <b>Economías Digitales</b><br />
        Las personas migrantes están dispuestos a aprender las habilidades necesarias para las economías
        dig- itales. Se deben desarrollar programas para ambos, venezolano y ecuatorianos, para ayudar
        a aumentar su capacidad de trabajar dentro de la economía de servicios.
      </p>
    {/if}
  </div>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: fit-content;
    padding: 2em;
    overflow: scroll;
  }

  h1 {
    margin-top: 3rem;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  p {
    text-align: left;
    margin-top: 0;
  }

  #policy-title {
    font-size: min(9.5vw, 43pt);
  }
</style>
