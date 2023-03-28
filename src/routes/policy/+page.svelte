<div id="container">
  <div style="z-index: 11;position:fixed; right:0">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img class="backicon" src="$images/keyboard-arrow-down_119013.svg" onclick="history.back()" />
  </div>
  <h1 id="policy-title">Policy Recommendations</h1>

  <div id="policy-body">
    <h1>1</h1>
    <p>
      <b>Regularization of Documents</b><br />
      Regularization of immigration documents and recognition of accreditations aan help improve migrants’
      employment or working conditions, and access to financial services.
    </p>
    <h1>2</h1>
    <p>
      <b>Skills</b><br />
      Many migrants struggle to find a job that matches their skills, better connections should be made
      between the skills immigrants bring with them and the potential job market in Ecuador.
    </p>
    <h1>3</h1>
    <p>
      <b>Training and Internet</b><br />
      Migrants are able to contribute to the economy, but they lack training and stable access to the
      internet, finding ways to provide better access to internet services and training could help.
    </p>
    <h1>4</h1>
    <p>
      <b>Informal Sector</b><br />
      The Ecuador economy is 51% informal which means that to help migrants in Ecuador we must also help
      the Ecuadorian economy. Programs available for Migrants should also be available for Ecuadorian.
    </p>
    <h1>5</h1>
    <p>
      <b>Digital Economy</b><br />
      Migrants are willing to learn skills needed for the digital economy programs should be developed
      for both Venezuelan and Ecuadorian living in Ecuador to help increase their ability to work within
      this service economy.
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

  #policy-title {
    font-size: min(10vw, 43pt);
  }

  p {
    text-align: left;
  }

  #policy-body {
    margin-bottom: 5vh;
  }

  .backicon {
    height: 10px;
    color: #6f6f6f;
    display: flex;
    justify-content: center;
    z-index: 13;
    transform: rotate(90deg);
    position: relative;
    padding-right: 0.5em;
    padding-top: 1em;
  }
</style>
