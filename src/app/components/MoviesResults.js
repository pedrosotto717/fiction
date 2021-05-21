import Component from "../prottoDom/Component.js";
import { MoviesContext } from "../states/MoviesContext.js";
import MoviesCard from "./MovieCard.js";

const MoviesResults = new Component({
  name: 'MoviesResults',

  useContext: MoviesContext.provider(),

  template: function (props = {}) {
    return (
      `<ul class="movies-results">
        ${this.context.movieList.length > 0
        ? this.context.movieList.map(movie => MoviesCard({ data: movie, index: movie.id })).join('')
        : ''}
      </ul>`
    )
  }
})

export default MoviesResults