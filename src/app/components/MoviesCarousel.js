import MovieCard from './MovieCard.js'
import InfiniteCarousel from '../helpers/InfiniteCarousel.js'

function MoviesCarousel({ name, getMovies, timerCarousel, title }) {
  return {
    name,

    state: {
      loading: true,
      movies: [],
      carousel: null
    },

    template: function () {
      return (
        `<section class="carousel container">

          <div class="carousel__header">
            <h3 class="carousel__title">
              ${title}
            </h3>
            <a href="#/movies" class="carousel__link-more btn">Explore More</a>
          </div>

          <div class="movies-carousel-container">
            <button class="controls-carousel control-carousel-prev">
              <span class="fa fa-chevron-left"></span>
            </button>

            <div class="movies-carousel">
              ${this.loading
          ? ''
          : this.state.movies.map(movie => MovieCard({
            className: `movies-carousel__item`,
            index: movie.id,
            data: movie
          })).join('')}
            </div>

            <button class="controls-carousel control-carousel-next">
              <span class="fa fa-chevron-right"></span>
            </button>

          </div>
        </section>`
      )
    },

    componentDidMount: async function () {
      this.setState({ loading: true })
      const moviesData = await getMovies()

      if (!moviesData.results)
        return false

      this.setState({ movies: moviesData.results || new Array(10), loading: false })

      const carouselLastMovies = new InfiniteCarousel({
        container: `${this.selector} .movies-carousel`,
        classItems: `movies-carousel__item`,
        prevSelector: `${this.selector} button.control-carousel-prev`,
        nextSelector: `${this.selector} button.control-carousel-next`,
        timeInterval: timerCarousel
      })

      this.setState({ carousel: carouselLastMovies })
      document.addEventListener('routeChange', () => {
        carouselLastMovies.stop()
      });
    },

    componentDidUpdate: function () {
      this.state.carousel.updatingCarousel()
    }
  }
}

export default MoviesCarousel