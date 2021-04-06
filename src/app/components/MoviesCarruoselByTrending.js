import Component from '../protto/Component.js'

const MoviesCarruoselByTrending = new Component({
  name: 'MoviesCarruoselByTrending',

  state: {
    loading: true,
    moviesByTrending: []
  },

  template: function () {
    return (
      `<div class="movies-carruosel">
      MoviesCarruoselByTrending
      </div>`
    )
  },

  componentDidMount: function () {
    console.log('componentDidMount')
  }
});

export default MoviesCarruoselByTrending