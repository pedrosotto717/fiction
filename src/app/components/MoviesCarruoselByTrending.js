import Component from '../prottoDom/Component.js'
import carousel from '../helpers/carousel.js'
import MovieCard from './MovieCard.js'

const arr = [];

for (let i = 0; i <= 10; i++) {
  arr.push(i)
}

const MoviesCarruoselByTrending = new Component({
  name: 'MoviesCarruoselByTrending',

  state: {
    loading: true,
    moviesByTrending: []
  },

  template: function () {
    return (
      `<div class="movies-carousel">
          <button id="control-carousel-prev" class="controls-carousel btn">
            prev
          </button>
          <div id="carousel-last-movies">
            ${arr.map(el => MovieCard({
              className: "carousel-last-movies__item",
              index: el
            })).join('')}
          </div>
          <button id="control-carousel-next" class="controls-carousel btn">
            next
          </button>
      </div>`
    )
  },

  componentDidMount: function () {
    const [goLeft, goRight] = carousel({
      container: '#carousel-last-movies',
      classItems: 'carousel-last-movies__item'
    })

    setInterval(goRight, 5000)
    this.addEventListener('click', goLeft, '#control-carousel-prev')
    this.addEventListener('click', goRight, '#control-carousel-next')
  }
});

export default MoviesCarruoselByTrending