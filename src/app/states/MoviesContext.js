import Context from "../prottoDom/Context.js";

const MoviesContext = Context.create({
  name: 'MoviesContext',
  state: {
    page: 1,
    movieList: [],
    total_pages: 2,
    moviesProvider: null
  }
});

export { MoviesContext }