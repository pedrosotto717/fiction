import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { goToNotFound } from '../components/NotFound.js'
import { MoviesContext } from '../states/MoviesContext.js'
import { stopLoader } from '../helpers/stopLoader.js'
import { setTitle } from '../helpers/title.js'
import { getByGenre, getGenres } from '../services/API.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'
import Loader from '../components/Loader.js';
import { stringToSlug } from '../helpers/stringToSlug.js'
import { putCommasToNumber } from '../helpers/putCommasToNumber_dan.js'
import { clearSlug } from '../helpers/clearSlug.js'

async function load() {
  if (!Router.is('Genres')) return false

  const { args } = Router.dispatch()
  setTitle(`Fiction | ${args.name}`)

  if (typeof parseInt(args.id) !== "number" || args.name == false) return goToNotFound()


  const [movies = {}, genres = []] = await Promise.all([
    getByGenre(parseInt(args.id)),
    getGenres()
  ]);

  const [_, setMoviesContext] = MoviesContext.provider()

  this.setState({
    genres,
    data: {
      title: args.name,
      genre_id: args.id,
      total_results: movies.total_results
    }
  })

  setMoviesContext({
    page: parseInt(movies.page),
    movieList: movies.results,
    total_pages: parseInt(movies.total_pages),
    moviesProvider: (page) => getByGenre(parseInt(args.id), page)
  })

  stopLoader()
}

const GenresPage = new Component({
  name: "GenresPage",

  state: {
    loading: false,
    genres: [],
    data: {
      title: '',
      genre_id: 0,
      total_results: 0
    }
  },

  template: function (props = {}) {
    return (
      `<main class="container genres-p movies-page">
        ${this.state.loading === true
        ? Loader()
        : `
            <section class="genres">
              <ul class="genres__list">
                ${this.state.genres.map(genre => `
                  <li class="genres__item">
                    <a href="#/genres/${genre.id}/${stringToSlug(genre.name)}" class="btn genres__link ${parseInt(genre.id) === parseInt(this.state.data.genre_id) ? 'active' : ''}">
                      ${genre.name}
                    </a>
                  </li>
                `).join('')}
              </ul>
            </section>

            <header class="movies-page__header">
              <h2 class="movies-page__title">Genre: ${clearSlug(this.state.data.title)}</h2>
              <p class="movies-page__total-results">${putCommasToNumber(this.state.data.total_results)} results</p>
            </header>

            <section class="movies-results">
              ${MoviesResults.render()}
            </section>
            ${LoadMore.render()}
          `}
      </main>`
    )
  },

  componentDidMount: async function () {
    window.scrollTo(0, 0)
    load.call(this)
  },

  componentWillUpdate: async function () {
    window.scrollTo(0, 0)
    load.call(this)
  }
})

export default GenresPage


// "#/genres/:id/:name"

// carousel: action | animation | fiction | horror

// Genre: action

// MoviesResults.render()
// card | card | card
// LoadMore.render()

// setMoviesContext({
//     page: parseInt(movies.page),
//     movieList: movies.results,
//     total_pages: parseInt(movies.total_pages),
//     moviesProvider: dataMap.handler
//   })