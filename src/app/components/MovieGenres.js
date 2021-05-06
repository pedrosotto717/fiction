import Component from '../prottoDom/Component.js'
import { getGenres, makeBackDrop, getPopular } from '../services/API.js'
import storage from '../helpers/storage.js'
import { AppContext } from '../states/AppContext.js';
/**
  La Logica para traer y posiblemente cargar los generos
  la debo abstraer aparte en otra funcion o Componente
  para posteriormente utilizarla en las paginas de
  movie-list (search, genre) y movie (details)
*/


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

  /*
    DE PRIMERO SI O SI: {
      la barra de busqueda con los respectvos filtros

      ya luego si el overlay, el cual podria reutilizar,
      para que me muestre el genero seleccionado o talvez
      el termino buscado
    }

    para el filtrado por categoria nesecitariamos otra pagina
    o utilizar la misma pagina de busqueda

    // lo del overlay se mostraria hasta que el usuario
    // realize otra busqueda

    1) Otra Pagina {
        una pagina con una estructura muy simple y limpia podria tener
        una seccion como de bienvenida con un overlay
        que indeque que genero se esta consultando y luego las peliculas
        a modo de grid con 'lazy loading' e 'infinite scrool'
      }

    2) La Pagina de Buasqueda {
      isRoute('search')
      ? ('la primera seccion donde se muestre el
      termino de busqueda y la barra de busqueda')
      : ('la primera seccion donde se muestre el
        Genero que se esta consultando con overlay')
    }

    // si hay filtros usaria el endpoint Discover
  */
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

    this.pushContext({ loading: false })
  }
});

export default MovieGenres