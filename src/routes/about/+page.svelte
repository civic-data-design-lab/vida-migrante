<script>
  import BackButton from '$lib/components/BackButton.svelte';
</script>

<div id="container">
  <BackButton />
  <h1>About</h1>
  <p>
    Vida Migrante: Venezuelan Migrants Inclusion in Ecuador is a research project analyzing the food
    security, economic conditions, trade-offs and inclusion of recent Venezuelan migrants in
    Ecuador. According to the R4V platform more than 500,000 Venezuelans are living in Ecuador in
    2022. Many of these migrants living in Ecuador struggle to meet their basic needs, during the
    summer of 2022 the United Nations World Food Programme (WFP) interviewed 920 migrants at 16
    cities locations to understand their experience.
  </p>
  <p>
    The results show that while Venezuelan migrants struggle to integrate into the Ecuadorian
    economy due to factors such as legalized documents, there’s a strong willingness to pursue
    trainings and programs to improve their economic situation. A mismatch of vocational skills and
    attainable careers, coupled with insufficient resources to improve the employment opportunities
    such as internet and trainings, has led to high food insecurity and _____. Migrants put ___% of
    their income towards basic necessities like food, rent and health and cannot afford to pursue
    opportunities such as trainings to improve their economic situation.
  </p>
  <p>
    Migrants with regularized immigration documents or legalized professional accreditations earn
    more on average than those without any. Similarly, migrants that found jobs matching their skill
    sets were more likely to be food secure.
  </p>
  <p>
    Our findings suggest that policy assistances such as programs to regularize immigration
    documents, legalize Venezuelan professional accreditations, or provide significant food
    assistance would alleviate financial burdens and catalyze Inclusion into the Ecuadorian economy.
  </p>
  <p>
    To help understand the financial tribulations and difficult choices made by Venezuelan migrants
    in Ecuador, we invite you to step into their shoes and live through four months of life events,
    opportunities, and assistance through our mobile simulation.
  </p>

  <div id="credits">
    <h1>Credits</h1>
    <p style="margin:0.0em; ">
      <a href="https://civicdatadesignlab.mit.edu"><b>Civic Data Design Lab</b></a>
    </p>
    <p style="margin-top:.5em; ">
      Sarah Williams, Director<br />
      Alberto Meouchi, Project Manager<br />
      Ashley Louie, Rohun Iyer, Jari Prachasartta, Gabriela Carucci, Enrique Casillas, Eric Lam, Christina
      Chen, Ilana Strauss, Sylvia Jimenez, Ethan Harrison, Mauricio Darcourt, Carlos Centeno.
    </p>

    <p style="margin:0.0em; ">
      <a href="https://www.wfp.org/"><b>UN World Food Programme</b></a>
    </p>
    <p style="margin-top:.5em; ">
      Alessandro Donucci, Luis Fernández, Crescenzo Rubinotti, Espedito Nastro.
    </p>
  </div>
</div>

<style>
  #container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding: 2em;
    overflow: scroll;
  }

  #container::-webkit-scrollbar {
    display: none;
  }

  p {
    text-align: left;
  }

  #credits {
    margin-bottom: 5vh;
  }
</style>
