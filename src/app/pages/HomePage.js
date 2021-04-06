import Component from '../protto/Component.js'
import Header from '../components/Header.js'
import MoviesCarruoselByTrending from '../components/MoviesCarruoselByTrending.js'
// import Loader from '../components/Loader.js'

const HomePage = new Component({
  name: "Home",

  state: {
    loader: true
  },

  template: function (props = {}) {
    return (
      `<div id="app">
        <h1>Bienvenidos al Home</h1>
        ${Header()}
        ${MoviesCarruoselByTrending.render()}
      </div>`
    )
  },

  events() {
  },

  componentDidMount: async function () {
  }
})

export default HomePage