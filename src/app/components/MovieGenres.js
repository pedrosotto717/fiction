import Component from '../prottoDom/Component.js'
import { getGenres, makeBackDrop, getPopular } from '../services/API.js'
import storage from '../helpers/storage.js'
import { AppContext } from '../states/AppContext.js';
import Router from '../prottoDom/Router.js';

function setBackGround(elem, bgPath) {
  const element = document.querySelector(elem) || null
  if (element === null) return false

  element.style.setProperty('--bg-genres', `url(../.${makeBackDrop(bgPath)})`)
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
              <a class="genres-list__link" data-genre-id="${genre.id}" href="#/genres/${genre.id}">
                ${genre.name}
              </a>
            </li>
          `).join('')}
        </ul>
      </section>`
    )
  },

  componentDidMount: async function () {
    try {
      const genres = await getGenres()

      if (genres === undefined)
        return false

      this.setState({ genres, loading: false })
      const bgGenres = storage.get('bg-genres-list')

      if (bgGenres) {
        this.setState({ bgList: bgGenres })
        return false
      }

      const bgList = {},
        { results = [] } = await getPopular()

      genres.forEach(({ id }) => {
        let { backdrop_path } = results.find(({ genre_ids }, index) => genre_ids.includes(id)) || {}
        bgList[id] = backdrop_path || ''
      });

      this.setState({ bgList })
      storage.set('bg-genres-list', bgList)
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

        this.addEventListener('mouseover', (ev) => {
          const _id = parseInt(ev.target.dataset.genreId)
          if (this.state.bgList[_id] === '')
            return false

          setBackGround('.movie-genres-container', this.state.bgList[_id])
        }, '.genres-list__link');
      } else {
        this.setState({ classAnimation: "animate" })
      }
    } // end try_catch_finally
  },

  componentDidUpdate: async function () {
    const { results = [] } = await getPopular()

    setBackGround('.movie-genres-container',
      Object.values(this.state.bgList)
        .find(bg => bg !== ""
          && bg !== results[0].backdrop_path
          && bg !== results[1].backdrop_path))

    if (Router.is('Home'))
      this.pushContext({ loading: false })
  }
});

export default MovieGenres