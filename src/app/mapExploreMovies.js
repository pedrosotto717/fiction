import { getPopular, getTrendingLastDay, getUpcoming } from "./services/API.js";

const mapExploreMovies = new Map([
  ['popular', getPopular],
  ['trending', getTrendingLastDay],
  ['upcoming', getUpcoming]
]);

export { mapExploreMovies }