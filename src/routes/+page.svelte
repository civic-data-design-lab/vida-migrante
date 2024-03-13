<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  import { Parallax, ParallaxLayer } from 'svelte-parallax';

  import { Languages } from '$lib/utils/types';
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';
  import cddlLogo from '$images/cddl_logo_black.svg';
  import mitLogo from '$images/mit-logo-black-blue.png';
  import wfpLogo from '$images/wfp-logo-standard-black-en.svg';
  import usaidLogo from '$images/usaid_horizontal_RGB_Black.png';

  import va from '@vercel/analytics';
  import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';

  /** Page data loaded from `+layout.server.svelte` */
  export let data;
  $: language = data.language;

  //for transition
  let ready = false;
  const maxOffset = 500;
  let offset = tweened(0, {
    duration: 4500,
    easing: cubicInOut,
  });
  onMount(() => {
    ready = true;
    offset.set(maxOffset);
  });

  //for scrolling
  let y;
  let container;

  let page = 1;
</script>

<svelte:window bind:scrollY={y} />

{#if ready}
  {#if page === 1}
    <div id="container" class="centered-column" bind:this={container}>
      <div id="intro" style="filter: saturate(max(0, calc(1 - {y / window.innerHeight})))">
        <img
          id="quito-2"
          src={'/images/welcomepage/landscape/QUITO_2.png'}
          alt=""
          style="
          transform: translateX({$offset - maxOffset}px);
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="avila"
          src={'/images/welcomepage/landscape/AVILA.png'}
          alt=""
          style="
          transform: translateX(calc({y * 0.2}em + {maxOffset - $offset}px));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="caracas-3"
          src={'/images/welcomepage/landscape/CARACAS_3.png'}
          alt=""
          style="
          transform: translateX(calc({y * 0.2}em + {maxOffset - $offset}px));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="caracas-bldgs"
          src={'/images/welcomepage/landscape/CARACAS_BLDGS.png'}
          alt=""
          style="
          transform: translateX(calc({y * 0.2}em + {500 - $offset}px));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="quito-1"
          src={'/images/welcomepage/landscape/QUITO_1.png'}
          alt=""
          style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="quito-houses"
          src={'/images/welcomepage/landscape/QUITO_HOUSES.png'}
          alt=""
          style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="caracas-2"
          src={'/images/welcomepage/landscape/CARACAS_2.png'}
          alt=""
          style="
          transform: translateX(calc({y * 0.2}em + {500 - $offset}px));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="caracas-1"
          src={'/images/welcomepage/landscape/CARACAS_1.png'}
          alt=""
          style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
        />
        <img
          id="quito-trees"
          src={'/images/welcomepage/landscape/QUITO_TREES.png'}
          alt=""
          style="
          transform: translateX(calc({$offset - 500}px - {y * 0.2}em));
          opacity: {$offset / maxOffset};
        "
        />
      </div>

      <Parallax sections={3.4}>
        <div id="parallax-container" class="centered-column constrained">
          <ParallaxLayer rate={1} class="centered-column">
            <div style="padding-left:2rem; padding-right:2rem">
              <p
                style="text-align: center; font-size: 36pt; font-weight: bolder;text-align: center;word-wrap: break-word;"
              >
                Vida Migrante
              </p>
              <p style="font-size: 21pt; font-weight: 400; line-height: 24pt; text-align: center;">
                {#if language === Languages.ENGLISH}
                  Venezuelan Migrants' Inclusion in Ecuador.
                {:else}
                  Inclusión de los Migrantes Venezolanos en Ecuador.
                {/if}
              </p>
              <ScrollIndicator />
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1} rate={1} class="centered-column">
            <div style="z-index: 12; padding-left: 2rem; padding-right: 2rem;">
              <h1 style="text-align: center; width: auto">
                {#if language === Languages.ENGLISH}
                  Venezuelan Migrants <br /> in Ecuador
                {:else}
                  Migrantes Venezolanos <br /> en Ecuador
                {/if}
              </h1>
              <p style="text-align: left; font-family: 'open-sans', sans-serif;">
                {#if language === Languages.ENGLISH}
                  Welcome! <br /><br />
                  We invite you to explore the <b>conditions in which migrants' households</b> live
                  in Ecuador. <br /><br />
                  All the simulated <b>data is based on a survey</b> conducted by the World Food
                  Programme in October 2022 to <b>920 migrant households</b> in Ecuador. <br /><br
                  />
                  It will take you around <b>four minutes</b> to go through the simulation. To
                  continue, please <b>scroll down</b> and follow the instructions. <br /><br />
                  If you want to learn more about the socioeconomic conditions of the migrants,
                  <b
                    ><a
                      target="_blank"
                      href="https://www.dropbox.com/sh/yl6mzpgsbp1nwfo/AADosvws6XWdoS3JJtAKV0Jwa?dl=0"
                      style="font-family: 'open sans', sans-serif;">click here</a
                    ></b
                  >.
                {:else}
                  ¡Bienvenido! <br /><br />
                  Te invitamos a explorar
                  <b>las condiciones en las que viven los hogares de los migrantes</b>
                  en Ecuador. <br /><br />
                  Todos los datos de la simulación se basan en una encuesta realizada por el Programa
                  Mundial de Alimentos en octubre de 2022 a 920 hogares de migrantes en Ecuador.
                  <br /><br />
                  Le tomará alrededor de <b>cuatro minutos</b> visitar la simulación. Para
                  continuar, <b>desplácese hacia abajo</b> y siga las instrucciones. <br /><br />
                  Si quieres conocer más sobre el estudio sobre las condiciones socioeconómicas de los
                  migrantes haz
                  <b
                    ><a
                      target="_blank"
                      href="https://www.dropbox.com/sh/yl6mzpgsbp1nwfo/AADosvws6XWdoS3JJtAKV0Jwa?dl=0"
                      style="font-family: 'open sans', sans-serif;">clic aquí</a
                    ></b
                  >. <br /><br />
                {/if}
              </p>
              <ScrollIndicator />
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2} rate={1} span={1.5} class="centered-column">
            <div style="padding-left: 2rem; padding-right: 2rem;" class="centered-column" out:fade>
              <h1 style="text-align: center; width: auto">
                {#if language === Languages.ENGLISH}
                  Migrants' Life in Ecuador
                {:else}
                  Vida de los Migrantes in Ecuador
                {/if}
              </h1>
              <img src={'/images/migrants/Luis.png'} alt="Luis" style="width: 60%" />
              <p style="text-align: left; font-family: 'open-sans', sans-serif;">
                {#if language === Languages.ENGLISH}
                  <b>Over half</b> of the migrants spent
                  <b style="color: #E6B157">more than 90 percent</b> of their monthly income on basic
                  necessities like rent, utilities, health, and food.
                {:else}
                  <b>Más de la mitad</b> de los migrantes gastan
                  <b style="color: #E6B157">más del 90 por ciento</b> de sus ingresos mensuales en necesidades
                  básicas como alquiler, servicios públicos, salud y alimentos.
                {/if}
              </p>
              <p style="text-align: left; font-family: 'open-sans', sans-serif;">
                {#if language === Languages.ENGLISH}
                  <b>94%</b> of households have an income 94% below the national average in Ecuador,
                  <span style="color: #94439d;"><b>$840</b></span>. Migrants' households average
                  income is
                  <span style="color: #e7ab9c;"><b>$313</b></span>.
                {:else}
                  <b>El 94%</b> de los hogares tiene un ingreso inferior al promedio nacional de
                  Ecuador, <span style="color: #94439d;"><b>$840</b></span>. El promedio de ingreso
                  de los hogares migrantes es de
                  <span style="color: #e7ab9c;"><b>$313</b></span>.
                {/if}
              </p>
              <p style="text-align: left; font-family: 'open-sans', sans-serif; margin-bottom: 0">
                {#if language === Languages.ENGLISH}
                  This leaves them with <b>little left for other essential needs</b>. In order to
                  make their money last, they must make a series of choices as they navigate their
                  experience in Ecuador. <br /><br />
                  <b>Help migrants make these choices.</b> <br /><br />
                  Go through the simulation by helping migrants improve their livelihoods. The process
                  will show you how the situation is <b>extremely difficult</b> for most migrants.
                {:else}
                  Esto les deja <b>poco para otras necesidades</b> esenciales. Para hacer que su
                  dinero dure, toman una serie de decisiones mientras navegan su experiencia en
                  Ecuador. <br /><br />
                  <b>Ayuda a los migrantes a tomar estas decisiones.</b> <br /><br />
                  Navega la simulación ayudando a los migrantes a mejorar sus medios de vida. El proceso
                  te mostrará cómo la situación es <b>extremadamente difícil</b> para la mayoría de los
                  migrantes.
                {/if}
              </p>
              <button id="continue" class="button" on:click|once={() => (page = 2)}>
                {#if language === Languages.ENGLISH}Continue{:else}Continuar{/if}
              </button>
              <div id="more-links">
                <a href="/about">
                  {#if language === Languages.ENGLISH}About{:else}Acerca{/if}
                </a>
                <a href="/policy">
                  {#if language === Languages.ENGLISH}Policy Recommendations{:else}Recomendaciones{/if}
                </a>
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </Parallax>
    </div>
  {:else}
    <div id="page-2" class="centered-column constrained responsive" in:fade={{ delay: 500 }}>
      <div style="z-index: 12; padding-left: 2rem; padding-right: 2rem;">
        <h1 style="text-align: center;" class="h1-responsive">
          {#if language === Languages.ENGLISH}
            How to explore the simulation
          {:else}
            ¿Cómo explorar la simulación?
          {/if}
        </h1>

        <p style="text-align: left; font-family: 'open-sans', sans-serif;" class="p-responsive">
          {#if language === Languages.ENGLISH}
            The goal of the simulation is to <b>improve the livelihood</b> of the chosen character.
          {:else}
            El objetivo de la simulación es <b>mejorar el sustento</b> del personaje escogido.
          {/if}
        </p>
        <ol type="1" style="padding-left: 1em;">
          <li>
            <p style="margin: 0; font-family: 'open-sans', sans-serif;" class="p-responsive">
              {#if language === Languages.ENGLISH}
                1. Please select a profile and an occupation. These selection will show a specific <b
                  >monthly income and expenses
                </b> of that household.
              {:else}
                1. Selecciona un perfil y una ocupación. Esta selección desplegará los <b
                  >ingresos y gastos mensuales</b
                > que tiene ese hogar.
              {/if}
            </p>
          </li>
          <li>
            <p style="margin: 0; font-family: 'open-sans', sans-serif;" class="p-responsive">
              {#if language === Languages.ENGLISH}
                2. You will go through 4 rounds or scenarios, each one is <b>one month</b> and
                <b>one challenge.</b>
              {:else}
                2. La simulación tiene 4 rondas o escenarios, cada uno representa <b>un mes</b> y
                <b>un reto.</b>
              {/if}
            </p>
          </li>
          <li>
            <p style="margin: 0; font-family: 'open-sans', sans-serif;" class="p-responsive">
              {#if language === Languages.ENGLISH}
                3. Draw a card for every month. The card contains an event or a situation you
                <b>have to face through a decision.</b>
              {:else}
                3. Tomarás una tarjeta para cada mes. Cada tarjeta contiene un evento o una
                situación que debes
                <b>enfrentar a través de una decisión.</b>
              {/if}
            </p>
          </li>
          <li>
            <p style="margin: 0; font-family: 'open-sans', sans-serif;" class="p-responsive">
              {#if language === Languages.ENGLISH}
                4. Each option or decision you make will
                <b>affect your income and your expenses.</b> In the lower console, you will be able
                to decide how to <b>divide your expenses</b> but you will see some alerts when you
                make changes, which will indicate if you cover the <b>basic needs</b> or not with what
                you intend to spend. Move the bars to allocate the expense for each category.
              {:else}
                4. Cada decisión u opción que tomes
                <b> afectará tus ingresos y tus gastos.</b> En la consola inferior, podrás decidir
                como
                <b>dividir tus gastos</b> pero verás algunas alertas cuando realices cambios, que
                indicarán si cubres las <b>necesidades básicas</b> o no con lo que pretendes gastar.
                Mueva las barras para asignar el gasto para cada categoría.
              {/if}
            </p>
          </li>
          <li>
            <p style="margin: 0; font-family: 'open-sans', sans-serif;" class="p-responsive">
              {#if language === Languages.ENGLISH}
                5. You will have the opportunity to access
                <b>assistance that allows your family to improve the situation in the country.</b>
              {:else}
                5. Tendrás la oportunidad de acceder a
                <b>asistencias que permitan que tu familia mejore la situación en el país.</b>
              {/if}
            </p>
          </li>
        </ol>
      </div>
      <a
        href="/game"
        class="button"
        data-sveltekit-preload-code="viewport"
        on:click|once={() => va.track('Start Game', { where: 'How to Play' })}
      >
        {#if language === Languages.ENGLISH}Start{:else}Empezar{/if}
      </a>
    </div>
  {/if}
{/if}

<footer>
  <span class="logos">
    <img src={mitLogo} alt="MIT Logo" />
    <img
      src={cddlLogo}
      alt="Civic Data Design
    Lab Logo"
    />
    <img
      src={wfpLogo}
      alt="World Food Programme Logo
    (English)"
      style:height="28px"
    />
    <img src={usaidLogo} alt="USAID Logo" style:height="28px" />
  </span>

  <LanguageToggle />
</footer>

<style>
  #container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  #intro {
    position: fixed;
    top: 0;
    height: inherit;
    width: inherit;
    background-image: url('/images/welcomepage/landscape/QUITO_BG_VOLCANO.png');
    background-position: 60% 20vh;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #quito-2 {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 200%;
    bottom: -42%;
    right: -80%;
  }

  #avila {
    position: absolute;
    z-index: 3;
    height: 60%;
    width: 250%;
    bottom: -10%;
    right: -50%;
  }

  #caracas-3 {
    position: absolute;
    z-index: 4;
    height: 36%;
    width: 150%;
    bottom: -10%;
    right: -5%;
  }

  #caracas-bldgs {
    position: absolute;
    z-index: 5;
    height: 44%;
    width: 100%;
    bottom: -6%;
    right: 10%;
  }

  #quito-1 {
    position: absolute;
    z-index: 6;
    height: 35%;
    width: 200%;
    left: -5%;
    bottom: -8%;
  }

  #quito-houses {
    position: absolute;
    z-index: 7;
    height: 50%;
    width: 100%;
    bottom: -10%;
    left: 10%;
  }

  #caracas-2 {
    position: absolute;
    z-index: 8;
    height: 60%;
    width: 120%;
    bottom: -20%;
  }

  #caracas-1 {
    position: absolute;
    z-index: 9;
    height: 40%;
    width: 100%;
    bottom: -20%;
    right: 10%;
  }

  #quito-trees {
    position: absolute;
    z-index: 7;
    height: 50%;
    width: 120%;
    bottom: -12%;
    right: -10%;
  }

  #parallax-container {
    min-height: calc(100 * var(--vh));
    width: calc(100 * var(--vw));
  }

  #continue {
    margin-top: 2rem;
  }

  #more-links {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 2rem;
    gap: 0.25rem;
  }

  #page-2 {
    height: 100vh;
  }

  #page-2 li {
    margin-bottom: 1rem;
  }

  footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 5;

    padding: 1rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    backdrop-filter: blur(2px);
  }

  .logos {
    max-width: calc(45 * var(--vw));

    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .logos img {
    height: 20px;
  }

  a.button {
    margin-top: 0.5em;
  }

  @media only screen and (max-height: 750px), (max-width: 380px) {
    .p-responsive {
      font-size: 11pt;
      margin: 0;
    }

    ol {
      margin: 0;
    }
  }

  @media only screen and (max-width: 700px) {
    #page-2 {
      margin-bottom: 300px;
      justify-content: start;
    }
  }

  @media only screen and (max-height: 700px) {
    .responsive {
      justify-content: start;
    }

    .h1-responsive {
      margin-top: 2rem;
      margin-bottom: 0;
    }
  }
</style>
