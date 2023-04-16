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
          <div id="intro-text">
            {@html migrant.introText}
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="carousel-control" id="left-control" />
  <div class="carousel-control" id="right-control" />
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

  .carousel-control {
    z-index: 1;
    position: absolute;
    margin-top: 17vh;
    width: 0;
    height: 0;
    border-block: 10px solid transparent;
      cursor: pointer;
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

  #intro-text {
      width: 95%;
  }

  img {
    height: 35vh;
  }
</style>
