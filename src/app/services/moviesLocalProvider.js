
const API_KEY = '423aa5b8f08553dd8806cf2e8025a1bd',
  API_URL = './themoviedb',
  IMAGE_URL = `${API_URL}/images`,
  // con API_KEY
  GET_POPULAR = `${API_URL}/popular.json`,
  GET_TRENDING = `${API_URL}/trendingLastDay.json`,
  GET_UPCOMING = `${API_URL}/upcoming.json`,
  GET_BY_GENRE = `${API_URL}/genre-animation.json`,
  GET_MOVIE_DETAILS = `${API_URL}/movie-details.json`,
  GENRES = `${API_URL}/genres.json`,
  SEARCH = `${API_URL}/search-1.json`,
  SIMILAR_MOVIE = `${API_URL}/similar-movie-details.json`,
  TMDB_LOGO = `${IMAGE_URL}/tmdb.svg`,
  MOVIE_APPEND_ALL = '?append_to_response=images,videos,casts',
  GET_VIDEO = `${API_URL}/video.json`,
  GET_PERSON = `${API_URL}/1663195.json`,// https://api.themoviedb.org/3/person/${id}
  GET_IMG_PERSON = `${API_URL}/1663195_img.json`,// https://api.themoviedb.org/3/person/${id}/images
  GET_CREDITS_PERSON = `${API_URL}/1663195_credits.json`, // https://api.themoviedb.org/3/person/${id}/movie_credits?sort_by=popularity.desc
  API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjNhYTViOGYwODU1M2RkODgwNmNmMmU4MDI1YTFiZCIsInN1YiI6IjYwM2QwODgwOGQxYjhlMDA1MThkYzJlNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TqldesRioChWSEpyncwhnEISn0SIy7nf2bTXbJaTYlE`
export default {
  API_URL,
  IMAGE_URL,
  GET_POPULAR,
  GET_TRENDING,
  GET_UPCOMING,
  GET_MOVIE_DETAILS,
  MOVIE_APPEND_ALL,
  GENRES,
  SEARCH,
  TMDB_LOGO,
  SIMILAR_MOVIE,
  GET_BY_GENRE,
  GET_VIDEO,
  GET_PERSON,
  GET_IMG_PERSON,
  GET_CREDITS_PERSON
}