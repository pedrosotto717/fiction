import Component from "../prottoDom/Component.js";
// import MoviesCard from "./MovieCard.js";

const MoviesResults = new Component({
  name: 'MoviesResults',

  state: {
    movieList: [],
    page: 0
  },

  template: function (props = {}) {
    return (
      `<ul class="movies-results>
        ${this.state.movieList.length > 0
        ? 'MAP'
        : ''}
        
      </ul>`
    )
  }
})

export default MoviesResults