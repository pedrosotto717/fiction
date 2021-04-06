import DOM from './app/protto/DOM.js'
import Router from './app/protto/Router.js'
import App from './app/components/App.js'
/* Pages */
import HomePage from './app/pages/HomePage.js'
import MoviePage from './app/pages/MoviePage.js'
import SearchPage from './app/pages/SearchPage.js'

Router.load([
  {name: 'Home', path: '/', handler: HomePage},
  {name: 'Movie', path: '/movie/:id', handler: MoviePage},
  {name: 'Search', path: '/search', handler: SearchPage}
])

Router.init()

DOM.render(
  App.render(),
  document.body
)