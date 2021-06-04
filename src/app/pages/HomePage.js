import Component from '../prottoDom/Component.js'
import Header from '../components/Header.js'
import CarouselPopularMovies from '../components/CarouselPopularMovies.js'
import CarouselTrendingMovies from '../components/CarouselTrendingMovies.js'
import CarouselUpcomingMovies from '../components/CarouselUpcomingMovies.js'
import MovieGenres from '../components/MovieGenres.js'
import bannerThirdMovie from '../components/BannerThirdMovie.js'
import { setTitle } from '../helpers/title.js'
import ModalVideo from '../components/ModalVideo.js'

const HomePage = new Component({
  name: "Home",
  template: function (props = {}) {
    setTitle('Fiction')
    return (
      `<main id="home">
        ${Header.render()}
        ${CarouselPopularMovies.render()}
        ${bannerThirdMovie.render()}
        ${CarouselTrendingMovies.render()}
        ${CarouselUpcomingMovies.render()}
        ${MovieGenres.render()}
        ${ModalVideo.render()}
      </main>`
    )
  }
})

export default HomePage