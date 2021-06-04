import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { MoviesContext } from '../states/MoviesContext.js'
import { stopLoader } from '../helpers/stopLoader.js'
import { setTitle } from '../helpers/title.js'
import { search } from '../services/API.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'
import Loader from '../components/Loader.js';
import { putCommasToNumber } from '../helpers/putCommasToNumber_dan.js'

async function load() {
  if (!Router.is('Search')) return false
  setTitle(`Fiction | Search`)

  const { args } = Router.dispatch(),
    [_, setMoviesContext] = MoviesContext.provider()

  const movies = await search(args.keyword)

  this.setState({
    data: {
      title: args.keyword,
      total_results: movies.total_results
    }
  })

  setMoviesContext({
    page: parseInt(movies.page),
    movieList: movies.results,
    total_pages: parseInt(movies.total_pages),
    moviesProvider: (page) => search(args.keyword, page)
  })

  stopLoader()
}

const SearchPage = new Component({
  name: "SearchPage",

  state: {
    loading: false,
    data: {
      title: '',
      total_results: 0
    }
  },

  template: function (props = {}) {
    return (
      `<main class="container search-p movies-page">
        ${this.state.loading === true
        ? Loader()
        : `
            <header class="movies-page__header">
              <h2 class="movies-page__title">Search For: ${this.state.data.title}</h2>
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

export default SearchPage