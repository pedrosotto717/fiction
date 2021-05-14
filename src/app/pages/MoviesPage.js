import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { mapExploreMovies } from '../mapExploreMovies.js'
import { AppContext } from '../states/AppContext.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'

const loadMovies = async function () {
  if (!Router.is('Movies')) return false
  const [_, setContext] = AppContext.provider()
  this.setState({ loading: false });

  setTimeout(() => {
    console.log('in Movies')

    const { args } = Router.dispatch()

    if (!mapExploreMovies.has(args.explore) && Router.is('Movies')) {
      console.log("in STEP")
      return setContext({ notFound: true })
    }

    return setContext({ loading: false, notFound: false })
  }, 10)
}

const MoviesPage = new Component({
  name: "MoviesPage",

  state: {
    loading: true
  },

  template: function (props = {}) {
    console.log("____RENDERING____")
    return (
      `<main class="container movies-page">
        ${this.state.loading === true
        ? 'Loading ...'
        : `<header class="movies-page">
              <h2>Some</h2>
              <p>100 results</p>
            </header>

            <section class="movies-page__results">
              ${MoviesResults.render()}
            </section>

            ${LoadMore.render()}
          `}
      </main>`
    )
  },

  componentDidMount: async function () {
    await loadMovies.call(this)
  },

  componentWillUpdate: async function () {
    await loadMovies.call(this)
  }
})

export default MoviesPage