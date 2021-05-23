import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { goToNotFound } from '../components/NotFound.js'
import { mapExploreMovies } from '../mapExploreMovies.js'
import { MoviesContext } from '../states/MoviesContext.js'
import { stopLoader } from '../helpers/stopLoader.js'
import { setTitle } from '../helpers/title.js'
import { putCommasToNumber } from '../helpers/putCommasToNumber_dan.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'
import Loader from '../components/Loader.js';
import { clearSlug } from '../helpers/clearSlug.js'

const verifyLoad = async function () {
  const { args } = Router.dispatch()
  setTitle(`Fiction | ${args.explore}`)

  this.setState({ loading: false });
  if (!mapExploreMovies.has(args.explore) && Router.is('Movies'))
    return goToNotFound()

  stopLoader()
  return args.explore
}

async function load() {
  if (!Router.is('Movies')) return false

  const keyMap = await verifyLoad.call(this)

  if (typeof keyMap !== "string") return false

  const dataMap = mapExploreMovies.get(keyMap),
    movies = await dataMap.handler(),
    [_, setMoviesContext] = MoviesContext.provider()

  this.setState({
    data: {
      title: dataMap.title,
      total_results: movies.total_results
    }
  })

  setMoviesContext({
    page: parseInt(movies.page),
    movieList: movies.results,
    total_pages: parseInt(movies.total_pages),
    moviesProvider: dataMap.handler
  })
}

const MoviesPage = new Component({
  name: "MoviesPage",

  state: {
    loading: true,
    data: {
      title: '',
      total_results: 0
    }
  },

  template: function (props = {}) {
    return (
      `<main class="container movies-p movies-page">
        ${this.state.loading === true
        ? Loader()
        : `<header class="movies-page__header">
              <h2 class="movies-page__title">${clearSlug(this.state.data.title)}</h2>
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

export default MoviesPage