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
    <h1>About</h1>
  {:else}
    <h1>Acerca</h1>
  {/if}
  {#if language == Languages.ENGLISH}
    <p>
      Vida Migrante: Venezuelan Migrants Inclusion in Ecuador is a research project analyzing the
      food security, economic conditions, trade-offs and inclusion of recent Venezuelan migrants in
      Ecuador. According to the R4V platform more than 500,000 Venezuelans are living in Ecuador in
      2022. Many of these migrants living in Ecuador struggle to meet their basic needs, during the
      summer of 2022 the United Nations World Food Programme (WFP) interviewed 920 migrants at 16
      cities locations to understand their experience.
    </p>
  {:else}
    <p>
      Vida Migrante: Inclusión de Migrantes Venezolanos en Ecuador es un proyecto de investigación
      que analiza la seguridad alimentaria, condiciones económicas, ingresos e inclusión de
      migrantes venezolanos recientes en Ecuador. Según la plataforma R4V más de 500.000 venezolanos
      viven en Ecuador en 2022. Muchos de estos migrantes luchan por satisfacer sus necesidades
      básicas, durante el verano de 2022, el Programa Mundial de Alimentos (PMA) de las Naciones
      Unidas entrevistó a 920 migrantes de 16 ciudades para entender su experiencia.
    </p>
  {/if}
  {#if language == Languages.ENGLISH}
    <p>
      The results show that while Venezuelan migrants struggle to integrate into the Ecuadorian
      economy due to factors such as legalized documents, there’s a strong willingness to pursue
      trainings and programs to improve their economic situation. A mismatch of vocational skills
      and attainable careers, coupled with insufficient resources to improve the employment
      opportunities such as internet and trainings, has led to high food insecurity and an inability
      to integrate into the economy. Nearly two-thirds of migrants put 75% of their income towards
      basic necessities like food, rent and health and cannot afford to pursue opportunities such as
      trainings to improve their economic situation.
    </p>
  {:else}
    <p>
      Los resultados muestran que mientras los migrantes venezolanos luchan por integrarse a la
      economía debido a factores tales como la legalización de documentos, existe voluntad de buscar
      capacitaciones y programas para mejorar su situación económica. Un desajuste de las
      habilidades profesionales y acreditaciones, junto con recursos insuficientes para mejorar sus
      ingresos acceso a Internet y capacitaciones, ha llevado a una alta inseguridad alimentaria y a
      la incapacidad para integrarse a la economía. Casi dos tercios de los inmigrantes dedican el
      75% de sus ingresos a necesidades básicas como comida, alquiler y salud y no pueden buscar
      otras oportunidades como capacitaciones laborales para mejorar su situación económica.
    </p>
  {/if}
  {#if language == Languages.ENGLISH}
    <p>
      Migrants with regularized immigration documents or legalized professional accreditations earn
      more on average than those without any. Similarly, migrants that found jobs matching their
      skill sets were more likely to be food secure.
    </p>
  {:else}
    <p>
      Los migrantes con documentos migratorios o acreditaciones profesionales legalizadas ganan más
      en promedio que aquellos sin estos documentos. De manera similar, los inmigrantes que
      encontraron trabajos que coincidían con sus habilidades tienen más probabilidades de obtener
      seguridad alimentaria.
    </p>
  {/if}
  {#if language == Languages.ENGLISH}
    <p>
      Our findings suggest that policy assistances such as programs to regularize immigration
      documents, legalize Venezuelan professional accreditations, or provide significant food
      assistance would alleviate financial burdens and catalyze Inclusion into the Ecuadorian
      economy.
    </p>
  {:else}
    <p>
      Nuestros hallazgos sugieren que las políticas de asistencia, los programas para regularizar la
      inmigración documentos, la legalización de acreditaciones profesionales, o proporcionar
      alimentos aliviaría las cargas financieras y catalizaría la inclusión en el Ecuador.
    </p>
  {/if}
  {#if language == Languages.ENGLISH}
    <p>
      To help understand the financial tribulations and difficult choices made by Venezuelan
      migrants in Ecuador, we invite you to step into their shoes and live through four months of
      life events, opportunities, and assistance through our mobile simulation.
    </p>
  {:else}
    <p>
      Para ayudar a comprender las decisiones difíciles tomadas por los migrantes en Ecuador, te
      invitamos a ponerte en sus zapatos y vivir cuatro meses de eventos de vida, oportunidades y
      asistencias a través de nuestra simulación móvil.
    </p>
  {/if}

  <div id="credits">
    {#if language == Languages.ENGLISH}
      <h1>Credits</h1>
    {:else}
      <h1>Créditos</h1>
    {/if}
    <p style="margin:0.0em; ">
      <a href="https://civicdatadesignlab.mit.edu"><b>Civic Data Design Lab</b></a>
    </p>
    {#if language == Languages.ENGLISH}
      <p style="margin-top:.5em; ">
        Sarah Williams, Director<br />
        Alberto Meouchi, Project Manager<br />
        Ashley Louie, Rohun Iyer, Jari Prachasartta, Gabriela Carucci, Enrique Casillas, Eric Lam, Christina
        Chen, Ilana Strauss, Sylvia Jimenez, Ethan Harrison, Mauricio Darcourt, Carlos Centeno.
      </p>
    {:else}
      <p style="margin-top:.5em; ">
        Sarah Williams, Directora<br />
        Alberto Meouchi, Líder de Proyecto<br />
        Ashley Louie, Rohun Iyer, Jari Prachasartta, Gabriela Carucci, Enrique Casillas, Eric Lam, Christina
        Chen, Ilana Strauss, Sylvia Jimenez, Ethan Harrison, Mauricio Darcourt, Carlos Centeno.
      </p>
    {/if}

    {#if language == Languages.ENGLISH}
      <p style="margin:0.0em; ">
        <a href="https://www.wfp.org/"><b>UN World Food Programme</b></a>
      </p>
    {:else}
      <p style="margin:0.0em; ">
        <a href="https://es.wfp.org/"><b>Programa Mundial de Alimentos</b></a>
      </p>
    {/if}
    <p style="margin-top:.5em; ">
      Alessandro Donucci, Luis Fernández, Crescenzo Rubinotti, Espedito Nastro.
    </p>

    <p style="margin:0.0em; ">
      <a href="https://www.usaid.gov/"><b>USAID</b></a>
    </p>
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

  p {
    text-align: left;
  }
</style>
