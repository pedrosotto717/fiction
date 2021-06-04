import InfiniteCarousel from '../helpers/InfiniteCarousel.js'
import Router from '../prottoDom/Router.js'
import Component from '../prottoDom/Component.js'
import { makePoster } from '../services/API.js';
import { cutText } from "../helpers/cutText_dan.js";

const CarouselCasting = new Component({
  name: 'CarouselCasting',

  state: {
    castList: [],
    carousel: null
  },

  template: function (props = {}) {
    return (
      `<section class="carousel">
          <div class="movies-carousel-container">
            <button class="controls-carousel control-carousel-prev">
              <span class="icon-left-open-big icon"></span>
            </button>

            <div class="movies-carousel">
              ${props.casts.map(cast => `
                <div class="cast-card">
                  <a href="#/cast/${cast.id}" class="cast-card__link">
                    <div class="poster-container">
                      <img class="poster-img" src="${makePoster(cast.profile_path)}" alt="${cast.character}" />
                    </div>
                    <p class="cast-card__title">${cutText(cast.name, 95)}</p>
                    <span class="cast-card__title">${cutText(cast.character, 95)}</span>
                  </a>
                </div>
              `).join('')}
            </div>

            <button class="controls-carousel control-carousel-next">
              <span class="icon-right-open-big icon"></span>
            </button>
          </div>
        </section>`
    )
  },

  componentWillMount: async function () {
    const carouselCast = new InfiniteCarousel({
      container: `${this.selector} .movies-carousel`,
      classItems: `cast-card`,
      prevSelector: `${this.selector} button.control-carousel-prev`,
      nextSelector: `${this.selector} button.control-carousel-next`,
      timeInterval: 0
    })

    this.setState({ carousel: carouselCast })
    document.addEventListener('routeChange', () => {
      carouselCast.stop()
    });
  },

  componentDidUpdate: function () {
    if (Router.is('Movie') === null) return false

    if (this.state.carousel)
      this.state.carousel.updatingCarousel()
  }
});

export default CarouselCasting