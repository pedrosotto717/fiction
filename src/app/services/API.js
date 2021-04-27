import provider from './moviesLocalProvider.js'
import request from "../helpers/requestMovie.js";

export async function getPopular(page = 1) {
  return await request(`${provider.GET_POPULAR}?page=${page}`, 'popularMovies')
}

export async function getTrendingLastDay(page = 1) {
  return await request(`${provider.GET_TRENDING}?page=${page}`, 'trendingLastDay')
}

export function makePoster(relativeUrl) {
  return provider.IMAGE_URL + relativeUrl
}

export function makeBackDrop(relativeUrl) {
  const a = provider.IMAGE_URL + relativeUrl
  console.log(a)
  return a
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