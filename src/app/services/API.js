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

export function makeBackDrop(relativeUrl = '', size = 'original') {
  return `${provider.IMAGE_URL}${relativeUrl}`
}

export function placeHolderYoutube(key) {
  return `${provider.IMAGE_URL}/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg`
  // return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
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

export async function getMovieDetails(id) {
  if (id == 460465)
    return await request(`${provider.API_URL}/460465.json`)
  return await request(`${provider.GET_MOVIE_DETAILS}?${provider.MOVIE_APPEND_ALL}`)
}

export async function getSimilarMovies(id, page = 1) {
  return await request(`${provider.SIMILAR_MOVIE}?page=${page}`)
}

export async function getPerson(id) {
  return await request(`${provider.GET_PERSON}`)
}

export async function getImgPerson(id) {
  return await request(`${provider.GET_IMG_PERSON}`)
}

export async function getCreditsPerson(id) {
  return await request(`${provider.GET_CREDITS_PERSON}`)
}

export async function getVideos(id) {
  return await request(`${provider.GET_VIDEO}?id=${id}`)
}

export function tmdbLogo() {
  return provider.TMDB_LOGO
}