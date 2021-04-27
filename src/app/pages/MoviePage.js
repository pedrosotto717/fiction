import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import {AppContext} from '../states/AppContext.js'

const loadMovie = async function () {
  const { args } = Router.dispatch()
  setTimeout(() => {
    this.setState({ movieId: args.id, loader: false });
    this.pushContext({loading: false})
  }, 1000)
}

/**
  va a tener todos los trailers al costado izquierdo
  y cuando los seleccionen  va a cargar el url del trailer
**/
const MoviePage = new Component({
  name: "Movie",

  state: {
    loader: true,
    movieId: null
  },

  useContext: AppContext.provider(),

  template: function (props = {}) {
    return (
      `<div id="app" class="container">
        ${this.state.loader === true
        ? ''
        : `<h1>Bienvenidos a la Movie : ${this.state.movieId}</h1>`}
      </div>`
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