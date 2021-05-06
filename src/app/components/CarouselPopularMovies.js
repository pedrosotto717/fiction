import Component from '../prottoDom/Component.js'
import { getPopular } from '../services/API.js'
import MoviesCarousel from './MoviesCarousel.js'

const CarouselPopularMovies = new Component(MoviesCarousel({
  name: 'CarouselPopularMovies',
  title: 'The Most Popular',
  getMovies: getPopular,
  customClass: 'popular-movies',
  timerCarousel: 8000
}));

export default CarouselPopularMovies