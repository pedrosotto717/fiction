import Component from '../prottoDom/Component.js'
import Header from '../components/Header.js'
import CarouselPopularMovies from '../components/CarouselPopularMovies.js'
import CarouselTrendingMovies from '../components/CarouselTrendingMovies.js'
import MovieGenres from '../components/MovieGenres.js'
import bannerThirdMovie from '../components/BannerThirdMovie.js'
import { setTitle } from '../helpers/title.js'

const HomePage = new Component({
  name: "Home",
  template: function (props = {}) {
    setTitle('Fiction')
    return (
      `<div id="app">
        ${Header.render()}
        ${CarouselPopularMovies.render()}
        ${bannerThirdMovie.render()}
        ${CarouselTrendingMovies.render()}
        ${MovieGenres.render()}
      </div>`
    )
  }
})

export default HomePage