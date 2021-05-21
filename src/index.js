import DOM from './app/prottoDom/DOM.js'
import Router from './app/prottoDom/Router.js'
import App from './app/components/App.js'
/* Pages */
import HomePage from './app/pages/HomePage.js'
import MoviePage from './app/pages/MoviePage.js'
import GenresPage from './app/pages/GenresPage.js'
import SearchPage from './app/pages/SearchPage.js'
import MoviesPage from './app/pages/MoviesPage.js'
import { NotFound } from './app/components/NotFound.js'

Router.load([
  { name: 'Home', path: '/', handler: HomePage },
  { name: 'Movies', path: '/movies/:explore', handler: MoviesPage },
  { name: 'Genres', path: '/genres/:id/:name', handler: GenresPage },
  { name: 'NotFound', path: '/not-found', handler: NotFound },

  //
  { name: 'Movie', path: '/movie/:id', handler: MoviePage },
  { name: 'Search', path: '/search', handler: SearchPage },
])

Router.init();

DOM.render(
  App.render(),
  document.body
)