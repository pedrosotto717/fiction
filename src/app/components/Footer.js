import { tmdbLogo } from "../services/API.js";

export default function () {
  const year = parseInt(Date().split(' ')[3]) || 2021
  return (
    `<footer class="container main-footer">

      <a href="#/" class="logo-title main-footer__title-logo">
        <h2 class="fiction">Fiction</h2>
      </a>


      <a href="https://github.com/pedrosotto717" target="_blank" rel="noopener noreferrer" class="main-footer__personal-data">
        &copy; ${year} pedro soto
      </a>

      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" class="credits">
        <img src="${tmdbLogo()}" class="tmdb-logo alt="TMDB">
        <p>This page Uses TMDB API but is not endorsed or certified by TMDB</p>
      </a>

    </footer>`
  )
}