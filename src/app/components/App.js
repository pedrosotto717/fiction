import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { AppContext } from '../states/AppContext.js'
import { getPopular } from '../services/API.js'
import { getTrendingLastDay } from '../services/API.js'
/* Components */
import GlobalLoader from './GlobalLoader.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'
import BtnToTop from "./BtnToTop.js";
import { goToNotFound, NotFound } from './NotFound.js'


const App = new Component({
  name: "App",

  state: {
    loading: true,
    error: false,
    mainComponent: {}
  },

  useContext: AppContext.provider(),

  template: function (props = {}) {

    if (Router.is('NotFound')) {
      return (
        `<div id="app">
          ${NotFound.render()}
          ${this.context.loading ? GlobalLoader() : ''}
        </div>`
      )
    } else if (this.state.error || this.state.mainComponent.handler === null) {
      return (
        `<div id="app">
          <div class="error">
            <h1>An Error has Happened</h1>
            <h3>The Api is Inaccessible</h3>
          </div>
          ${this.context.loading ? GlobalLoader() : ''}
        </div>`
      )
    }

    return (
      `<div id="app">
        ${this.state.loading === true
        ? ''
        : `
            ${NavBar.render()}
            ${this.state.mainComponent.handler.render()}
            ${Footer()}
          `}
        ${this.context.loading ? GlobalLoader() : ''}
        ${BtnToTop.render()}
      </div>`
    )
  },

  componentWillMount: async function () {
    Router.subscribe(({ args = null, handler = null }) => {
      this.pushContext({ loading: true })

      if (handler === null) {
        goToNotFound()
        return this.pushContext({ loading: false })
      }

      this.setState({ mainComponent: { args, handler }, loading: false })
      // this.pushContext({ loading: false })
    });

    const globalData = await Promise.all([
      getPopular(),
      getTrendingLastDay()
    ])

    if (typeof globalData[0] === 'string' && typeof globalData[1] === 'string') {
      this.setState({ error: true })
      return this.pushContext({ loading: false })
    }
  }
})

export default App