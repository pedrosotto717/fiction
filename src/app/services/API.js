import provider from './moviesProvider.js'
import request from "../helpers/requestMovie.js";

export async function getPopular(page = 1) {
  return await request(`${provider.GET_POPULAR}?page=${page}`, 'popularMovies')
}

export async function getTrendingLastDay(page = 1) {
  return await request(`${provider.GET_TRENDING}?page=${page}`, page === 1 ? 'trendingLastDay' : '')
}

export async function getUpcoming(page = 1) {
  return await request(`${provider.GET_UPCOMING}?page=${page}`, 'upcomingMovies')
}

export async function getByGenre(id, page = 1) {
  return await request(`${provider.GET_BY_GENRE}${id}&page=${page}`)
}

export async function getMovieDetails(id) {
  return await request(`${provider.GET_MOVIE_DETAILS}${id}${provider.MOVIE_APPEND_ALL}`)
}


export function makePoster(relativeUrl) {
  return `${provider.IMAGE_URL}w500/${relativeUrl}`
}

export function makeBackDrop(relativeUrl = '', size = 'original') {
  return `${provider.IMAGE_URL}${size}${relativeUrl}`
}


export async function getVideos(id) {
  return await request(`${provider.GET_VIDEO}${id}/videos`)
}

export function placeHolderYoutube(key) {
  return `https://img.youtube.com/vi/${key}/mqdefault.jpg`
}

export async function getGenres() {
  const data = await request(`${provider.GENRES}`, 'genres')
  return data.genres
}

export async function getSimilarMovies(id, page = 1) {
  return await request(`${provider.SIMILAR_MOVIE}${id}/similar?page=${page}`)
}

export async function getPerson(id) {
  return await request(`${provider.GET_PERSON}/${id}`)
}

export async function getImgPerson(id) {
  return await request(`${provider.GET_PERSON}/${id}/images`)
}

export async function getCreditsPerson(id) {
  return await request(`${provider.GET_PERSON}/${id}${provider.GET_CREDITS_PERSON}`)
}

export function tmdbLogo() {
  return provider.TMDB_LOGO
}

export async function search(keyword, page = 1) {
  return await request(`${provider.SEARCH}?query=${keyword}&page=${page}`)
}