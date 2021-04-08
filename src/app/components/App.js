import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import API from '../services/movieAPI.js'
/* Components */
import Loader from './Loader.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'

const App = new Component({
  name: "App",

  state: {
    loader: true,
    mainComponent: {}
  },

  template: function(props = {}) {
    return (
      `<div id="app">
        ${NavBar()}
        ${this.state.loader === true
          ? Loader()
          : this.state.mainComponent.handler.render()}
        ${Footer()}
      </div>`
    )
  },

  componentWillMount: async function() {
    Router.subscribe(({args, handler}) => {
      console.log(args, handler)
      this.setState({ mainComponent: {args, handler}, loader: false })
    });
  }
})

export default App
