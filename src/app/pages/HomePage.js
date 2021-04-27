import Component from '../prottoDom/Component.js'
import Header from '../components/Header.js'
import CarouselPopularMovies from '../components/CarouselPopularMovies.js'
import CarouselTrendingMovies from '../components/CarouselTrendingMovies.js'
import MovieGenres from '../components/MovieGenres.js'
// import Loader from '../components/Loader.js'

const HomePage = new Component({
  name: "Home",
  template: function (props = {}) {
    return (
      `<div id="app">
        ${Header.render()}
        ${CarouselPopularMovies.render()}
        ${CarouselTrendingMovies.render()}
        <div style="display:none" class="last-trailers">
          <h1>Last Trailers</h1>
        </div>
        ${MovieGenres.render()}
      </div>`
    )
  }
})

export default HomePage