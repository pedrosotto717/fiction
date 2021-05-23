import Component from "../prottoDom/Component.js";
import { getPopular } from "../services/API.js";
import { cutText } from "../helpers/cutText_dan.js";
import { makeBackGround } from "../helpers/makeBackGround.js";
import { setVarCss } from "../helpers/setVarCss.js";

const bannerThirdMovie = new Component({
  name: "bannerThirdMovie",

  state: {
    movie: {}
  },

  template: function (props) {
    return (
      `<div class="banner-third-movie container">
        ${this.state.movie.title
        ? `<div class="banner-third-movie__header">

            <h3 class="banner-third-movie__title">${this.state.movie.title}</h3>

            <p class="banner-third-movie__overview">${cutText(this.state.movie.overview, 120)}</p>

            <a class="btn banner-third-movie__btn" href="#/movie/${this.state.movie.id}">
              View more <span class="icon icon-right-open"></span>
            </a>

          </div>
          <div class="banner-third-movie__year">${this.state.movie.release_date.split('-')[0]}</div>`
        : ''
      }
      </div>`
    )
  },

  componentDidMount: async function () {
    const { results = [] } = await getPopular()

    if (results.length === 0)
      return false

    this.setState({ movie: results[1] })

    const callbackAnimation = (ev) => {
      const $element = document.querySelector('.banner-third-movie')

      if ($element === null) return false

      if ($element.getBoundingClientRect().top < (innerHeight * 0.85)) {
        $element.classList.add('animate')
      }
    }

    addEventListener('scroll', callbackAnimation)
  },

  componentDidUpdate: function () {
    if (!this.state.movie) return false
    const url = makeBackGround(this.state.movie.backdrop_path)
    setVarCss('.banner-third-movie', '--bg-banner-third-movie', url)
  }
})

export default bannerThirdMovie