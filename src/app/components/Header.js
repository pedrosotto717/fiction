import Component from '../prottoDom/Component.js'
import { getPopular, getVideos } from '../services/API.js'
import { cutText } from '../helpers/cutText_dan.js'
import { makeBackGround } from '../helpers/makeBackGround.js'

const Header = new Component({
  name: 'Header',

  state: {
    data: null,
    videoKey: null,
    animate: true
  },

  template: function (props = {}) {
    const url = makeBackGround(this.state.data ? this.state.data.backdrop_path : '')
    return (
      `<header class="header-container">
        ${this.state.data
        ? `<div class="main-header container" style="--bg-image: ${url};">
            <div class="header ${this.state.animate ? 'is-animate' : ''}">
              <h2 class="header__title">
                <a href="#/movie/${this.state.data.id}">
                  ${this.state.data.title}
                </a>
              </h2>

              <div class="header__movie-props">
                <span class="header__vote_average">
                  <span class="icon-star icon"></span>
                  ${this.state.data.vote_average}
                </span>

                <span class="header__year">${this.state.data.release_date.split('-')[0]}</span>
              </div>

              <p class="header__overview">
                ${cutText(this.state.data.overview)}
              </p>
              <button class="btn video header__video-btn" data-video-key="${this.state.videoKey}">
                Watch Trailer
              </button>
            </div>
          </div>`
        : ''}
      </header>`
    )
  },

  componentDidMount: async function () {
    const { results } = await getPopular()
    const movie = results[0]

    const video = await getVideos(movie.id) // le paso por parametro el id de la pelicula
    const videoKey = video.results.find(video => video.type === 'Trailer').key

    this.setState({
      data: movie,
      videoKey
    })

    document.addEventListener('routeChange', () => {
      this.setState({ animate: false })
    });
  }
})

export default Header