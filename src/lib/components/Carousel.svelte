<script>
  import { page } from '$app/stores';

  const migrants = $page.data.migrantData.migrants;
</script>

<div class="carousel">
  <div class="carousel-viewport">
    {#each migrants as migrant, i}
      <div id="carousel-slide{i}" class="carousel-slide">
        <div class="carousel-content">
          <img src={`/images/migrants/${migrant.name}.svg`} alt={migrant.name} />
          <h3>{migrant.name}</h3>
          <span style:text-transform="capitalize">{migrant.age}, {migrant.maritalStatus}</span>
          <div class="intro-text">
            <p>{@html migrant.introText}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div id="left-control-hitbox">
    <div id="left-control" />
  </div>
  <div id="right-control-hitbox">
    <div id="right-control" />
  </div>
</div>

<style>
  .carousel {
    position: relative;
    height: calc(70 * var(--vh));
    width: min(calc(90 * var(--vw)), 675px);
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel-viewport {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    overflow-x: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }

  .carousel-viewport::-webkit-scrollbar {
    display: none;
  }

  .carousel-slide {
    position: relative;
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    scroll-snap-align: center;
  }

  #left-control-hitbox,
  #right-control-hitbox {
    z-index: 1;
    position: absolute;
    margin-top: calc(17 * var(--vh));
    width: 20px;
    height: 30px;
    cursor: pointer;
  }

  #right-control-hitbox {
    right: 0;
  }

  #left-control,
  #right-control {
    position: absolute;
    bottom: 5px;
    z-index: 1;
    width: 0;
    height: 0;
    border-block: 10px solid transparent;
  }

  #left-control {
    border-right: 10px solid #333;
  }

  #right-control {
    border-left: 10px solid #333;
    right: 0;
  }

  .carousel-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: hidden;
    justify-content: space-evenly;
  }

  h3 {
    margin: 0;
  }

  span {
    font-family: 'sirenia', sans-serif;
    font-size: 16pt;
    font-weight: normal;
    color: #505050;
  }

  .intro-text {
    width: 95%;
  }

  img {
    height: 32vh;
  }

  @media only screen and (max-width: 400px) {
    img {
      height: 28vh;
    }
  }

  @media only screen and (max-height: 750px), (max-width: 360px) {
    span {
      font-size: 13pt;
    }

    .intro-text > p {
      font-size: 12pt;
      line-height: 15pt;
    }
  }
</style>
