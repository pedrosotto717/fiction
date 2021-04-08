import Component from '../prottoDom/Component.js'
import Header from '../components/Header.js'
import MoviesCarruoselByTrending from '../components/MoviesCarruoselByTrending.js'
// import Loader from '../components/Loader.js'

const HomePage = new Component({
  name: "Home",
  template: function (props = {}) {
    return (
      `<div id="app">
        <h1>Bienvenidos al Home</h1>
        ${Header()}
        ${MoviesCarruoselByTrending.render()}
      </div>`
    )
  }
})

export default HomePage