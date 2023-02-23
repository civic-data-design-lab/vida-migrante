<div class="carousel">
  <div class="carousel-viewport">
    <div id="carousel-slide1" class="carousel-slide">
      <a href="#carousel-slide4" class="carousel-prev">Go to last slide</a>
      <a href="#carousel-slide2" class="carousel-next">Go to next slide</a>
    </div>
    <div id="carousel-slide2" class="carousel-slide">
      <a href="#carousel-slide1" class="carousel-prev">Go to previous slide</a>
      <a href="#carousel-slide3" class="carousel-next">Go to next slide</a>
    </div>
    <div id="carousel-slide3" class="carousel-slide">
      <a href="#carousel-slide2" class="carousel-prev">Go to previous slide</a>
      <a href="#carousel-slide4" class="carousel-next">Go to next slide</a>
    </div>
    <div id="carousel-slide4" class="carousel-slide">
      <a href="#carousel-slide3" class="carousel-prev">Go to previous slide</a>
      <a href="#carousel-slide1" class="carousel-next">Go to first slide</a>
    </div>
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
    counter-reset: item;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }

  .carousel-slide {
    position: relative;
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    background-color: #f99;
    counter-increment: item;
    scroll-snap-align: center;
  }

  .carousel-slide:nth-child(even) {
    background-color: #99f;
  }

  .carousel-slide::before {
    content: counter(item);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -40%, 70px);
    color: #fff;
    font-size: 2em;
  }

  .carousel::before,
  .carousel::after {
    content: '';
    z-index: 1;
    position: absolute;
    margin-top: 35vh;
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
    margin-top: 35vh;
    height: 15px;
    width: 15px;
    font-size: 0;
  }
</style>
