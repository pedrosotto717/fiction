import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { goToNotFound } from '../components/NotFound.js'
import { MoviesContext } from '../states/MoviesContext.js'
import { stopLoader } from '../helpers/stopLoader.js'
import { setTitle } from '../helpers/title.js'
import { getByGenre, getSimilarMovies } from '../services/API.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'
import Loader from '../components/Loader.js';
import { putCommasToNumber } from '../helpers/putCommasToNumber_dan.js'
import { clearSlug } from '../helpers/clearSlug.js'

async function load() {
  window.scrollTo(0, 0)
  if (!Router.is('Similar')) return false

  const { args } = Router.dispatch()
  setTitle(`Fiction | Similar`)

  if (typeof parseInt(args.id) !== "number" || args.name == false) return goToNotFound()

  const movies = await getSimilarMovies(parseInt(args.id), 0)

  const [_, setMoviesContext] = MoviesContext.provider()

  this.setState({
    data: {
      title: args.name,
      total_results: movies.total_results
    }
  })

  setMoviesContext({
    page: parseInt(movies.page),
    movieList: movies.results,
    total_pages: parseInt(movies.total_pages),
    moviesProvider: (page) => getSimilarMovies(parseInt(args.id), page)
  })

  setTimeout(stopLoader, 100)
}

const SimilarPage = new Component({
  name: "SimilarPage",

  state: {
    loading: false,
    data: {
      title: '',
      total_results: 0
    }
  },

  template: function (props = {}) {
    return (
      `<main class="container similar-p movies-page">
        ${this.state.loading === true
        ? Loader()
        : `
            <header class="movies-page__header">
              <h2 class="movies-page__title">Similar To: ${clearSlug(this.state.data.title)}</h2>
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
    load.call(this)
  },

  componentWillUpdate: async function () {
    load.call(this)
  }
})

export default SimilarPage
