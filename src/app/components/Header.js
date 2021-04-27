import Component from '../prottoDom/Component.js'
import { getPopular, makeBackDrop } from '../services/API.js'
import { cutText } from '../helpers/cutText_dan.js'

function setBackGround(elem, bgPath) {
  const element = document.querySelector(elem)
  if(element)
    element.style.setProperty('--bg-image',`url(../.${makeBackDrop(bgPath)})`)
}

const Header = new Component({
  name: 'Header',

  state: {
    data: null
  },

  template: function (props = {}) { // 28
    return (
      `<header class="header-container">
        <div class="main-header container">
          ${this.state.data
        ? `
              <div class="header">
                <h2 class="header__title">
                  <a href="#/movie/${this.state.data.id}">
                    ${this.state.data.title}
                  </a>
                </h2>

                <div class="header__movie-props">
                  <span class="header__vote_average">
                    <span class="fa fa-star"></span>
                    ${this.state.data.vote_average}
                  </span>

                  <span class="header__year">${this.state.data.release_date.split('-')[0]}</span>
                </div>

                <p class="header__overview">
                  ${cutText(this.state.data.overview)}
                </p>
                <button class="btn video header__video-btn" data-movie-id="${this.state.data.id}">
                  <span class="fa fa-caret-right"></span>
                  Watch Trailer
                </button>
              </div>
               `
        : ''}
        </div>
      </header>`
    )
  },

  componentDidMount: function () {
    getPopular()
      .then(({ results }) => {
        console.log(results)
        // return results[0]
        return results.find(({ genre_ids }) => genre_ids.includes(16)) // 14 / 16
      })
      .then(movie => {
        this.setState({
          data: movie
        })
        setBackGround('.header-container', movie.backdrop_path)
      })
  },

  componentDidUpdate: function () {
    setBackGround('.header-container', this.state.data.backdrop_path)
  }
})

export default Header