import Component from '../prottoDom/Component.js'
import { getUpcoming } from '../services/API.js'
import MoviesCarousel from './MoviesCarousel.js'

const CarouselUpcomingMovies = new Component(MoviesCarousel({
  name: 'CarouselUpcomingMovies',
  title: 'Upcoming Movies',
  getMovies: getUpcoming,
  timerCarousel: 0,
  linkMore: 'upcoming'
}));

export default CarouselUpcomingMovies