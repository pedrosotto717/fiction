import { makePoster } from '../services/API.js'
import { cutText } from '../helpers/cutText_dan.js'

export default function MoviesCard({ className = '', index = 0, data }) {
  let { release_date } = data
  release_date = release_date.split('-')[0]
  return (
    `<div class="${className} movie-card">
      <a class="movie-card__link" href="#/movie/${index}">
        <div class="poster-container">
          <p class="release_year">${release_date}</p>
          <img class="poster-img" src="${makePoster(data.poster_path)}" alt="${data.original_title}" />
        </div>
        <p class="movie-card__title">${cutText(data.title, 95)}</p>
      </a>
    </div>`
  )
}
