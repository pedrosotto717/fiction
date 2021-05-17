import { getPopular, getTrendingLastDay, getUpcoming } from "./services/API.js";

const mapExploreMovies = new Map([
  ['popular', {
    title: 'The Most popular',
    provider: getPopular
  }],
  ['trending', {
    title: 'Trending',
    handler: getTrendingLastDay
  }],
  ['upcoming', {
    title: 'Upcoming',
    handler: getUpcoming
  }]
]);

export { mapExploreMovies }