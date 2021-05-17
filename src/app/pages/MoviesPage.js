import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { AppContext } from '../states/AppContext.js'
import { goToNotFound } from '../components/NotFound.js'
import { mapExploreMovies } from '../mapExploreMovies.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'

const virifyLoad = async function () {
  const [_, setContext] = AppContext.provider(),
    { args } = Router.dispatch()

  if (!Router.is('Movies')) return false

  this.setState({ loading: false });
  if (!mapExploreMovies.has(args.explore) && Router.is('Movies'))
    return goToNotFound()

  setContext({ loading: false })
  return args.explore
}

const MoviesPage = new Component({
  name: "MoviesPage",

  state: {
    loading: true
  },

  template: function (props = {}) {
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
    const keyMap = virifyLoad.call(this)
    if (typeof keyMap !== "string") return false

    const dataMap = mapExploreMovies.get(keyMap)
    console.log(dataMap)

  },

  componentWillUpdate: async function () {
    virifyLoad.call(this)
  }
})

export default MoviesPage