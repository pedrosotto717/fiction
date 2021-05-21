// #/search?q=movie-title
// -> para capturar el query_string debo:
/* escuchar el evento submit de la barra de busqueda y en dicho evento
   me encargaria de realizar la busqueda y setear las
   vaiables correspondientes
   setearia el MoviesContext con el respectivo handler*/
// #/search/movie-title

/*
d.addEventListener("submit", e=> {
  e.preventDefault()
  if(!e.target.matches(".search-form")) return false;

  const query = d.querySelector("form.search-form").search.value;
  location.hash = `#/search?q=${query}`
})
*/

import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { goToNotFound } from '../components/NotFound.js'
import { MoviesContext } from '../states/MoviesContext.js'
import { stopLoader } from '../helpers/stopLoader.js'
import { setTitle } from '../helpers/title.js'
import { getByGenre, getGenres } from '../services/API.js'
import MoviesResults from '../components/MoviesResults.js'
import LoadMore from '../components/LoadMore.js'
import Loader from '../components/Loader.js';

async function load() {
  if (!Router.is('Genres')) return false

  const { args } = Router.dispatch()

  if (typeof parseInt(args.id) !== "number" || args.name == false) return goToNotFound()

  setTitle(`Fiction | ${args.name}`)

  const [movies = {}, genres = []] = await Promise.all([
    getByGenre(parseInt(args.id)),
    getGenres()
  ]);

  const [_, setMoviesContext] = MoviesContext.provider()

  this.setState({
    genres,
    data: {
      title: args.name,
      genre_id: args.id,
      total_results: movies.total_results
    }
  })

  setMoviesContext({
    page: parseInt(movies.page),
    movieList: movies.results,
    total_pages: parseInt(movies.total_pages),
    moviesProvider: (page) => getByGenre(parseInt(args.id), page)
  })

  stopLoader()
}

const GenresPage = new Component({
  name: "GenresPage",

  state: {
    loading: false,
    genres: [],
    data: {
      title: '',
      genre_id: 0,
      total_results: 0
    }
  },

  template: function (props = {}) {
    console.log(this.state)
    return (
      `<main class="container genres-page">
      Search
        ${this.state.loading === true
        ? Loader()
        : `
            <section class="genres-carousel">
              <ul class="genres-carousel__list">
                ${this.state.genres.map(genre => `
                  <li class="genres-carousel__item">
                    <a href="#/genres/${genre.id}/${genre.name}" class="btn genres-carousel__link ${genre.id === this.state.data.genre_id ? 'active' : ''}">
                      ${genre.name}
                    </a>
                  </li>
                `).join('')}
              </ul>
            </section>

            <header class="genres-page__header">
              <h2 class="genres-page__title">Genre: ${this.state.data.title}</h2>
              <p class="genres-page__total-results">${this.state.data.total_results}</p>
            </header>

            <section class="genres-page__results">
              ${MoviesResults.render()}
            </section>
            ${LoadMore.render()}
          `}
      </main>`
    )
  },

  componentDidMount: async function () {
    window.scrollTo(0, 0)
    // load.call(this)
    stopLoader()
  },

  componentWillUpdate: async function () {
    // load.call(this)

  }
})

export default GenresPage