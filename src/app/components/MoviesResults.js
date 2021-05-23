import Component from "../prottoDom/Component.js";
import { MoviesContext } from "../states/MoviesContext.js";
import MoviesCard from "./MovieCard.js";

const MoviesResults = new Component({
  name: 'MoviesResults',

  useContext: MoviesContext.provider(),

  template: function (props = {}) {
    return (
      `<ul class="movies-results__list">
        ${this.context.movieList.length > 0
        ? this.context.movieList.map(movie =>
          `<li class="movies-results__item">
            ${MoviesCard({ className: "movies-results__card", data: movie, index: movie.id })}
          </li>`
        ).join('')
        : ''}
      </ul>`
    )
  }
})

export default MoviesResults