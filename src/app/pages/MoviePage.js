import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { getMovieDetails, getSimilarMovies, makePoster } from '../services/API.js'
import { putCommasToNumber } from "../helpers/putCommasToNumber_dan.js";
import { stringToSlug } from '../helpers/stringToSlug.js';
import multimediaNavTabs from '../components/multimediaNavTabs.js';
import SimilarMovies from '../components/SimilarMovies.js';
import { makeBackGround } from '../helpers/makeBackGround.js';
import ModalVideo from '../components/ModalVideo.js';
import ModalImage from '../components/ModalImage.js';
import { stopLoader } from '../helpers/stopLoader.js';

const loadMovie = async function () {
  const { args } = Router.dispatch()

  const movie = await getMovieDetails(args.id)
  const recommendedMovies = await getSimilarMovies(args.id)

  this.setState({ movieDetails: movie, recommended: recommendedMovies.results, animate: 'animate' })
  stopLoader()
}

const MoviePage = new Component({
  name: "MoviePage",

  state: {
    movieDetails: {},
    animate: '',
    recommended: []
  },

  template: function (props = {}) {
    if (!this.state.movieDetails.title) return ''

    let { release_date } = this.state.movieDetails,
      budget = parseInt(this.state.movieDetails.budget) > 0 ? `$${putCommasToNumber(this.state.movieDetails.budget)}` : '-'
    release_date = release_date.split('-')[0]

    const castList = this.state.movieDetails.casts.cast || [],
      crewList = this.state.movieDetails.casts.crew || [],
      imageList = this.state.movieDetails.images.backdrops.filter(backdrop => backdrop.vote_average > 5.2) || [],
      director = crewList.filter(person => person.department === 'Directing' && person.job === "Director"),
      urlDesktop = makeBackGround(this.state.movieDetails ? this.state.movieDetails.backdrop_path : ''),
      urlMobile = makeBackGround(this.state.movieDetails ? this.state.movieDetails.poster_path : '')

    return (
      `<main class="movie-p">
        <header class="movie-details-header container" style="--bg-desktop: ${urlDesktop}; --bg-mobile: ${urlMobile}">
         <div class="header-container ${this.state.animate}">
            <div class="generic-poster__container">
              <img
                class="poster-img"
                src="${makePoster(this.state.movieDetails.poster_path)}" 
                alt="${this.state.movieDetails.original_title}" />
            </div>

          <section class="movie-details ">
            <h2 class="movie-details__title">${this.state.movieDetails.title}</h2>

            <div class="movie-details__properties">
              <span class="movie-details__vote_average">
                <span class="icon-star icon"></span>
                ${this.state.movieDetails.vote_average}
              </span>
              <span class="movie-details__year">${release_date}</span>
              <span class="movie-details__runtime">${this.state.movieDetails.runtime} min</span>
            </div>

            <div class="movie-details__more-info">
              <p class="movie-details__item director">
                <span class="sub-title">Director:</span> ${director.map(el => ` ${el.name}`)}
              </p>
              
              <p class="movie-details__item budget">
                <span class="sub-title">Budget: </span> ${budget}
              </p>

              <p class="movie-details__item revenue">
                <span class="sub-title">Revenue:</span> $${putCommasToNumber(this.state.movieDetails.revenue)}
              </p>
              
              <p class="movie-details__item production">
                <span class="sub-title">Production:</span> ${this.state.movieDetails.production_companies.map(company => ` ${company.name}`)}
              </p>
            </div>
            
            <div class="movie-details__item movie-details__genres">
              <span class="sub-title">Genres: </span> ${this.state.movieDetails.genres.map(genre => `
              <a 
                href="#/genres/${genre.id}/${stringToSlug(genre.name)}" 
                title="Search By: ${genre.name}" 
                class="movie-details__genres--link"> ${genre.name}</a>`).join('')}
            </div>

            <p class="movie-details__overview">
              <span class="sub-title">Overview:</span>
              ${this.state.movieDetails.overview}
            </p>
          </section>
         </div>
        </header>
        
          ${multimediaNavTabs.render({
        videos: this.state.movieDetails.videos.results,
        images: imageList,
        cast: castList
      })}

        ${this.state.recommended.length > 0
          ? SimilarMovies.render({
        id: this.state.movieDetails.id,
        name: stringToSlug(this.state.movieDetails.title),
        similarMoviesList: this.state.recommended
      }) : ''}
        ${ModalVideo.render()}
        ${ModalImage.render()}
      </main>`
    )
  },

  componentDidMount: async function () {
    window.scrollTo(0, 0)
    await loadMovie.call(this)
  },

  componentWillUpdate: async function () {
    window.scrollTo(0, 0)
    await loadMovie.call(this)
  }
})

export default MoviePage