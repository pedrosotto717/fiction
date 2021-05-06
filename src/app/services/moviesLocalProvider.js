
const API_KEY = '423aa5b8f08553dd8806cf2e8025a1bd',
  API_URL = './themoviedb',
  IMAGE_URL = `${API_URL}/images`,
  // con API_KEY
  GET_POPULAR = `${API_URL}/popular.json`,
  GET_TRENDING = `${API_URL}/trendingLastDay.json`,
  GET_UPCOMING = `${API_URL}/upcoming.json`,
  GENRES = `${API_URL}/genres.json`,
  TMDB_LOGO = `${IMAGE_URL}/tmdb.svg`

export default {
  API_URL,
  IMAGE_URL,
  GET_POPULAR,
  GET_TRENDING,
  GET_UPCOMING,
  GENRES,
  TMDB_LOGO
}