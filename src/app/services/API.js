import provider from './moviesLocalProvider.js'
import request from "../helpers/requestMovie.js";

export function getPopular(page = 1) {
  return request(`${provider.GET_POPULAR}?page=${page}`, 'popularMovies')
}

export function getTrendingLastDay(page = 1) {
  return request(`${provider.GET_TRENDING}?page=${page}`, 'trendingLastDay')
}

export function makePoster(relativeUrl) {
  return provider.IMAGE_URL + relativeUrl
}