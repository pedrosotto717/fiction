import provider from './moviesLocalProvider.js'
import request from "../helpers/requestMovie.js";

export async function getPopular(page = 1) {
  return await request(`${provider.GET_POPULAR}?page=${page}`, 'popularMovies')
}

export async function getTrendingLastDay(page = 1) {
  if (page === 2)
    return await request(`${provider.API_URL}/trendingLastDay2.json`, page === 1 ? 'trendingLastDay' : '')
  return await request(`${provider.GET_TRENDING}?page=${page}`, page === 1 ? 'trendingLastDay' : '')
}

export async function getUpcoming(page = 1) {
  return await request(`${provider.GET_UPCOMING}?page=${page}`, 'upcomingMovies')
}

export async function getByGenre(id, page = 1) {
  return await request(`${provider.GET_BY_GENRE}?page=${page}`)
}

export async function search(keyword, page = 1) {
  // return await request(`${provider.SEARCH}?query=${keyword}&primary_release_year=${parseInt(Date().split(' ')[3]) || 2021}&page=${page}`)
  if (page === 2)
    return await request(`${provider.API_URL}/search-2.json?page=${page}`)
  return await request(`${provider.SEARCH}?page=${page}`)
}

export function makePoster(relativeUrl) {
  return provider.IMAGE_URL + relativeUrl
}

export function makeBackDrop(relativeUrl = '') {
  return `${provider.IMAGE_URL}${relativeUrl}`
}

export async function getGenres() {
  return new Promise((response, reject) => {
    setTimeout(() => {
      request(`${provider.GENRES}`, 'genres')
        .then(data => {
          response(data.genres)
        })
    }, 1000)
  })
}

export function tmdbLogo() {
  return provider.TMDB_LOGO
}