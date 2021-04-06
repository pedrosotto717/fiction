import Component from '../protto/Component.js'
import Router from '../protto/Router.js'
import Loader from '../components/Loader.js'

const loadMovie = async function () {
  const {args} = Router.dispatch()
  setTimeout(()=>{
    this.setState({ movieId: args.id, loader: false });
  },1000)
}

const MoviePage = new Component({
  name: "Movie",

  state: {
    loader: true,
    movieId: null
  },

  template: function (props = {}) {
    return (
      `<div id="app">
        ${this.state.loader === true
          ? Loader()
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