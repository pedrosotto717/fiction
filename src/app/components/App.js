import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
// import API from '../services/API.js'
/* Components */
import GlobalLoader from './GlobalLoader.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'
import { AppContext } from '../states/AppContext.js'

const App = new Component({
  name: "App",

  state: {
    loading: true,
    mainComponent: {}
  },

  useContext: AppContext.provider(),

  template: function (props = {}) {
    // this.pushContext({ loading: true })
    return (
      `<div id="app">
        ${NavBar()}
        ${this.state.loading === true
        ? 'InternalLoader()'
        : this.state.mainComponent.handler.render()}
        ${Footer()}
        ${this.context.loading ? GlobalLoader() : ''}
      </div>`
    )
  },

  componentWillMount: async function () {
    Router.subscribe(({ args, handler }) => {
      this.pushContext({ loading: true })
      this.setState({ mainComponent: { args, handler }, loading: false })
    });
  }
})

export default App
