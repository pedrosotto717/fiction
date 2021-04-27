export default function (props = {}) {
  return (
    `<div class="nav-bar-container">
      <nav class="container nav-bar">
        <div class="logo-title">
          <h1>Fiction</h1>
        </div>

        <div class="search-bar">
          {searchBar.render()}
        </div>

        <div class="main-menu">
          <a class="main-menu__link btn" href="#/">Home</a>
          <a class="main-menu__link btn" href="#/search">Search</a>
          <a class="main-menu__link btn" href="#/movie/50912">Test Movie</a>
        </div>
      </nav>
    </div>`
  )
}