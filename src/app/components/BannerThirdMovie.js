import Component from "../prottoDom/Component.js";
import { getPopular } from "../services/API.js";
import { cutText } from "../helpers/cutText_dan.js";
import { makeBackGround } from "../helpers/makeBackGround.js";

const bannerThirdMovie = new Component({
  name: "bannerThirdMovie",

  state: {
    movie: {}
  },

  template: function (props) {
    const url = makeBackGround(this.state.movie ? this.state.movie.backdrop_path : '')

    return (
      `<div class="banner-third-movie container" style="--bg-banner-third-movie: ${url};">
        ${this.state.movie.title
        ? `<div class="banner-third-movie__header">
           
            <h3 class="banner-third-movie__title">${this.state.movie.title}</h3>
            
            <p class="banner-third-movie__overview">${cutText(this.state.movie.overview, 120)}</p>
            
            <a class="btn banner-third-movie__btn" href="#/movie/${this.state.movie.id}">
              View more
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
    this.setState({ movie: results[1] })

    const callbackAnimation = (ev) => {
      const $element = document.querySelector('.banner-third-movie')
      if ($element.getBoundingClientRect().top < (innerHeight * 0.85)) {
        $element.classList.add('animate')
      }
    }

    addEventListener('scroll', callbackAnimation)
  }
})

export default bannerThirdMovie