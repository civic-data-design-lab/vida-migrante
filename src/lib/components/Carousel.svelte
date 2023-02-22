<script>
  import { migrants } from '$gameFiles/migrant-data.json';
  let numMigrants = migrants.length;
</script>

<div class="carousel">
  <div class="carousel-viewport">
    {#each migrants as migrant, i}
      <div id="carousel-slide{i}" class="carousel-slide">
        <a href="#carousel-slide{(i - 1 + numMigrants) % numMigrants}" class="carousel-prev">
          Go to last slide
        </a>
        <a href="#carousel-slide{(i + 1) % numMigrants}" class="carousel-next">
          Go to next slide
        </a>
        <div class="carousel-content">
          <img src="/src/lib/assets/images/{migrant.name}.png" alt="Manuel" />
          <h3>{migrant.name}</h3>
          <span>{migrant.age}, {migrant.maritalStatus}</span>
          {@html migrant.introText}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .carousel {
    position: relative;
    height: 70vh;
    width: 90vw;
    scrollbar-color: transparent transparent;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .carousel::-webkit-scrollbar {
    display: none;
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

  .carousel-slide {
    position: relative;
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    scroll-snap-align: center;
  }

  .carousel::before,
  .carousel::after {
    content: '';
    z-index: 1;
    position: absolute;
    margin-top: 17vh;
    width: 0;
    height: 0;
    border-block: 10px solid transparent;
    pointer-events: none;
  }

  .carousel::before {
    border-right: 10px solid #333;
  }

  .carousel::after {
    border-left: 10px solid #333;
  }

  .carousel::after,
  .carousel-next {
    right: 0;
  }

  .carousel-prev,
  .carousel-next {
    position: absolute;
    margin-top: 17vh;
    height: 15px;
    width: 15px;
    font-size: 0;
  }

  .carousel-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  img {
    height: 35vh;
  }
</style>
