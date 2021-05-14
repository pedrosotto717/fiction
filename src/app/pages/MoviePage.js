import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { AppContext } from '../states/AppContext.js'

const loadMovie = async function () {
  const { args } = Router.dispatch(),
    [_, setContext] = AppContext.provider()
  setTimeout(() => {
    this.setState({ movieId: args.id, loader: false });
    setContext({ loading: false })
  }, 1000)
}

/**
  va a tener todos los trailers al costado izquierdo
  y cuando los seleccionen  va a cargar el url del trailer
**/
const MoviePage = new Component({
  name: "MoviePage",

  state: {
    loader: true,
    movieId: null
  },

  template: function (props = {}) {
    return (
      `<main class="container">
        ${this.state.loader === true
        ? ''
        : `<h1>Bienvenidos a la Movie : ${this.state.movieId}</h1>`}
      </main>`
    )
  },

  componentDidMount: async function () {
    await loadMovie.call(this)
  },

  componentWillUpdate: async function () {
    this.setState({ loader: true });
    await loadMovie.call(this)
  }
})

export default MoviePage