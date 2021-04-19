import Component from '../prottoDom/Component.js'
import { getTrendingLastDay } from '../services/API.js'
import MoviesCarousel from './MoviesCarousel.js'

const CarouselTrendingMovies = new Component(MoviesCarousel({
  name: 'CarouselTrendingMovies',
  title: 'Trending Today',
  getMovies: getTrendingLastDay,
  timerCarousel: 10000
}));

export default CarouselTrendingMovies