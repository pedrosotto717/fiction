import Component from "../prottoDom/Component.js";
import Router from "../prottoDom/Router.js";
import { MoviesContext } from "../states/MoviesContext.js";
import Loader from "./Loader.js";


async function loadMovies() {
  const [_MoviesContext, setMoviesContext] = MoviesContext.provider(),
    hideLoader = () => document.querySelector('.load-more').style.display = "none"
  let movies = null, nextPage = _MoviesContext.page + 1

  if (nextPage <= _MoviesContext.total_pages) {
    movies = await _MoviesContext.moviesProvider(nextPage)

    if (movies === false) return hideLoader()
    setMoviesContext({
      page: nextPage,
      movieList: [..._MoviesContext.movieList, ...movies.results],
    })
  } else {
    hideLoader()
  }
}

function runObserver() {
  const observerBtn = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting)
      setTimeout(loadMovies, 1000)
  });

  const handlerClick = ev => {
    const $element = document.querySelector('.load-more')
    if ($element !== null)
      observerBtn.observe($element);

    if (!this.state.isButton && !Router.is('Movies')) return false
    this.setState({ isButton: false })
    removeEventListener('click', handlerClick)
  }

  this.addEventListener('click', handlerClick, '.load-more__btn')

  const handlerRouteChange = () => {
    this.setState({ isReady: false, isButton: true })
    observerBtn.disconnect()
    document.removeEventListener('routeChange', handlerRouteChange)
  }

  document.addEventListener('routeChange', handlerRouteChange)
}

const LoadMore = new Component({
  name: "LoadMore",

  state: {
    isButton: true,
    isReady: false
  },

  template: function (props = {}) {
    return (
      `<section class="load-more">
        ${this.state.isButton
        ? `<button class="btn load-more__btn">
            Load More
          <button>`
        : Loader()}
      </section>`
    )
  },

  componentDidUpdate: function () {
    if (this.state.isReady === false) {
      this.setState({ isReady: true })
      runObserver.call(this)
    }
  }
});

export default LoadMore