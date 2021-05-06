import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
/* Components */
import GlobalLoader from './GlobalLoader.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'
import { AppContext } from '../states/AppContext.js'
import NotFound from "./NotFound.js";
import { getPopular } from '../services/API.js'
import { getTrendingLastDay } from '../services/API.js'

const App = new Component({
  name: "App",

  state: {
    loading: true,
    notFound: false,
    error: false,
    mainComponent: {}
  },

  useContext: AppContext.provider(),

  template: function(props = {}) {

    if(this.state.notFound){
      return (
        `<div id="app">
          ${NotFound()}
        </div>`
      )
    }else if(this.state.error){
      return (
        `<div id="app">
          <div class="error">
            <h1>An Error has Happened</h1>
            <h3>The Api is Inaccessible</h3>
          </div>
        </div>`
      )
    }


    return (
      `<div id="app">
        ${this.state.loading === true
          ? ''
          : `
              ${NavBar()}
              ${this.state.mainComponent.handler.render()}
              ${Footer()}
            `}
        ${this.context.loading ? GlobalLoader() : ''}
      </div>`
    )
  },

  componentWillMount: async function() {
    Router.subscribe(({ args = null, handler = null }) => {
      this.pushContext({ loading: true })

      if (handler === null) {
        return this.setState({ notFound: true })
        this.pushContext({ loading: false })
      }

      this.setState({ mainComponent: { args, handler }, loading: false, notFound: false })
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