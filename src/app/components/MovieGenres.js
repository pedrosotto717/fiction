import Component from '../prottoDom/Component.js'
import { getGenres, makeBackDrop, getPopular } from '../services/API.js'
import storage from '../helpers/storage.js'
import { AppContext } from '../states/AppContext.js';
import Router from '../prottoDom/Router.js';
import { setVarCss } from '../helpers/setVarCss.js';
import { makeBackGround } from '../helpers/makeBackGround.js';
import { stringToSlug } from '../helpers/stringToSlug.js';

async function setBgGenresList() {
  const bgGenres = storage.get('bg-genres-list')

  if (bgGenres) {
    this.setState({ bgList: bgGenres })
    return false
  }

  const bgList = {},
    { results = [] } = await getPopular()

  this.state.genres.forEach(({ id }) => {
    let { backdrop_path } = results.find(({ genre_ids }, index) => genre_ids.includes(id)) || {}
    bgList[id] = backdrop_path || ''
  });

  this.setState({ bgList })
  storage.set('bg-genres-list', bgList)
}

async function setBackgroundGenres() {
  const { results = [] } = await getPopular()
  let _bg = makeBackGround(Object.values(this.state.bgList)
    .find(bg => bg !== ""
      && bg !== results[0].backdrop_path
      && bg !== results[1].backdrop_path))

  setVarCss('.movie-genres-container', '--bg-genres', _bg)
}

const MovieGenres = new Component({
  name: 'MovieGenres',

  state: {
    loading: true,
    genres: [],
    bgList: [],
    classAnimation: ''
  },

  useContext: AppContext.provider(),

  template: function (props = {}) {
    return (
      `<section class="movie-genres-container container">
        <ul class="genres-list ${this.state.classAnimation}">
          ${this.state.loading === true
        ? ''
        : this.state.genres.map((genre) => `
            <li class="genres-list__item">
              <a class="genres-list__link" data-genre-id="${genre.id}" href="#/genres/${genre.id}/${stringToSlug(genre.name)}">
                ${genre.name}
              </a>
            </li>
          `).join('')}
        </ul>
      </section>`
    )
  },

  componentWillMount: function () {
    this.addEventListener('mouseover', (ev) => {
      const _id = parseInt(ev.target.dataset.genreId)
      if (this.state.bgList[_id] !== '')
        setVarCss('.movie-genres-container', '--bg-genres', makeBackGround(this.state.bgList[_id]))
    }, '.genres-list__link');
  },

  componentDidMount: async function () {
    try {
      const genres = await getGenres()

      if (genres === undefined)
        return false

      this.setState({ genres, loading: false })

      setBgGenresList.call(this)

    } catch (e) {
      console.error(e);
    } finally {
      this.pushContext({ loading: false })
      let $element = document.querySelector('.genres-list')

      if (innerWidth > 1000) {
        const callbackAnimation = (ev) => {
          if ($element.getBoundingClientRect().top < (innerHeight * 0.85)) {
            $element.classList.add('animate')

            this.setState({ classAnimation: "animate" })
            removeEventListener('scroll', callbackAnimation)
          }
        }

        addEventListener('scroll', callbackAnimation)
      } else
        this.setState({ classAnimation: "animate" })


      setBackgroundGenres.call(this)
    } // end try_catch_finally
  },

  componentDidUpdate: async function () {
    if (this.state.bgList.length > 0)
      setBackgroundGenres.call(this)

    if (Router.is('Home'))
      this.pushContext({ loading: false })
  }
});

export default MovieGenres