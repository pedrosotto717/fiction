import Component from '../prottoDom/Component.js'
import MovieCard from './MovieCard.js'
import InfiniteCarousel from '../helpers/InfiniteCarousel.js'
import Router from '../prottoDom/Router.js'

const SimilarMovies = new Component({
  name: 'SimilarMovies',

  state: {
    carousel: null
  },

  template: function (props) {
    return (
      `<section class="carousel container">

          <div class="carousel__header">
            <h3 class="carousel__title">
              Similar Movies
            </h3>
            <a href="#/similar/${props.id}/${props.name}" class="carousel__link-more btn">Explore More</a>
          </div>

          <div class="movies-carousel-container">
            <button class="controls-carousel control-carousel-prev">
              <span class="icon-left-open-big icon"></span>
            </button>

            <div class="movies-carousel">
              ${props.similarMoviesList.map(movie => MovieCard({
        className: `movies-carousel__item`,
        data: movie
      })).join('')}
            </div>

            <button class="controls-carousel control-carousel-next">
              <span class="icon-right-open-big icon"></span>
            </button>

          </div>
        </section>`
    )
  },

  componentDidMount: async function () {
    const carouselLastMovies = new InfiniteCarousel({
      container: `${this.selector} .movies-carousel`,
      classItems: `movies-carousel__item`,
      prevSelector: `${this.selector} button.control-carousel-prev`,
      nextSelector: `${this.selector} button.control-carousel-next`,
      timeInterval: 0
    })

    this.setState({ carousel: carouselLastMovies })
    document.addEventListener('routeChange', () => {
      carouselLastMovies.stop()
    });
  },

  componentDidUpdate: function () {
    if (Router.is('Movie') === null) return false

    if (this.state.carousel)
      this.state.carousel.updatingCarousel()
  }
});


export default SimilarMovies