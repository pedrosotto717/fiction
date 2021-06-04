import Component from '../prottoDom/Component.js'
import Router from '../prottoDom/Router.js'
import { getCreditsPerson, getImgPerson, getPerson, makePoster } from '../services/API.js'
import { stopLoader } from '../helpers/stopLoader.js';
import { formatDate } from '../helpers/FormatDate.js';
import InfiniteCarousel from '../helpers/InfiniteCarousel.js';
import MoviesCard from '../components/MovieCard.js';

const loadMovie = async function () {
  if (!Router.is('Person')) return false
  const { args } = Router.dispatch()

  const [person, credits, photos] = await Promise.all([
    getPerson(args.id),
    getCreditsPerson(args.id),
    getImgPerson(args.id)
  ]);

  this.setState({ personData: person, photos: photos.profiles, credits: credits.cast, animate: 'animate' })
  stopLoader()
}

function calculateSizeItem(elem) {
  return elem.offsetWidth + parseInt(getComputedStyle(elem).marginLeft) + parseInt(getComputedStyle(elem).marginRight)
}

function getSizeCarousel() {
  const $containerCarousel = document.querySelector('.photos__list') || null
  if ($containerCarousel === null) return innerWidth
  return $containerCarousel.childElementCount * calculateSizeItem($containerCarousel.children[0])
}

function verifyCarousel() {
  const $container = document.querySelector('.photos') || null
  if ($container === null) return false

  if (getSizeCarousel() < (innerWidth * 1.065)) {
    this.state.carousel.stop()
    $container.classList.add('hide-btn')
  } else {
    this.state.carousel.updatingCarousel()
    $container.classList.remove('hide-btn')
  }
}

const PersonPage = new Component({
  name: "PersonPage",

  state: {
    personData: null,
    photos: [],
    credits: [],
    animate: 'animate',
    carousel: null
  },

  template: function (props = {}) {
    if (!this.state.personData) return ''

    return (
      `<main class="person-p">
        <header class="person-header">
          <div class="person-header__container ${this.state.animate}">
            <div class="generic-poster__container">
              <img
                class="poster-img"
                src="${makePoster(this.state.personData.profile_path)}"
                alt="${''}" />
            </div >

            <section class="person-details">
              <h2 class="person-details__title">${this.state.personData.name}</h2>
          
              <p class="person-details--item person-details__biography">
                ${this.state.personData.biography}
              </p>
              <p class="person-details--item person-details__born">
                <span class="sub-title">Born:</span> ${formatDate(this.state.personData.birthday)}
              </p>
              <p class="person-details--item person-details__born-place">
                <span class="sub-title">Place of Birth:</span> ${this.state.personData.place_of_birth}
              </p>
              <p class="person-details--item person-details__known-for">
                <span class="sub-title">Known For:</span> ${this.state.personData.known_for_department}
              </p>
            </section>
          </div>
        </header >

        <section class="photos">
          <h3 class="photos__title">Photos</h3>
          <div class="photos__container">

            <ul class="photos__list">
              ${this.state.photos.map(photo => `
                <div class="cast-card">
                  <div class="poster-container">
                    <img class="poster-img" src="${makePoster(photo.file_path)}" alt="Photo" />
                  </div>
                </div>
              `).join('')}
            </ul>

            <button class="controls-carousel control-carousel-next">
              <span class="icon-right-open-big icon"></span>
            </button>
          </div>
        </section>

        <section class="movies-results">
          <h3 class="movies-results__title">Known For</h3>
          <ul class="movies-results__list">
              ${this.state.credits.map(movie => `
                <li class="movies-results__item">
                  ${MoviesCard({ className: "movies-results__card", data: movie })}
                </li>
              `).join('')}
          </ul>
        </section>
      </main > `
    )
  },

  componentDidMount: async function () {
    await loadMovie.call(this)

    const carousel = new InfiniteCarousel({
      container: `${this.selector} .photos__list`,
      classItems: `cast-card`,
      prevSelector: `${this.selector} button.control-carousel-prev`,
      nextSelector: `${this.selector} button.control-carousel-next`,
      timeInterval: 0
    })

    this.setState({ carousel })
    document.addEventListener('routeChange', () => {
      carousel.stop()
    });

    addEventListener('resize', ev => {
      verifyCarousel.call(this)
    })

    verifyCarousel.call(this)
  },

  componentWillUpdate: async function () {
    await loadMovie.call(this)
  },

  componentDidUpdate: function () {
    if (this.state.carousel) {
      verifyCarousel.call(this)
    }
  }
})

export default PersonPage