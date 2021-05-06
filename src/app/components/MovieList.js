import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'

const MovieList = new Component({
  name: 'MovieList',

  state: {
    movies: {}
  },

  template: function(props = {}) {
    // let headerTitle = ''
    // if(Router.is('search')){
    //   console.log('Hey Search')
    // }

    return (
      `<section class="movie-list-container container">
        <div className="movie-list__Header">
          <h2 class="movie-list__title">

          </h2>
        </div>

        <ul class="movie-list__results">
          <li class="movie-list__item">
            Movie 1
          </li>
        </ul>
      </section>`
    )
  }
});


export default MovieList
