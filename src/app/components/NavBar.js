export default function (props = {}) {
  return (
    `<div class="nav-bar-container">
      <nav class="container nav-bar">
        <a href="#/" class="logo-title">
          <h1 class="fiction">Fiction</h1>
        </a>

        <div class="search-bar">
          {searchBar.render()}
        </div>

        <div class="main-menu">
          <button id="show-form" class="btn btn-search">
            <span class="icon-search-2"></span>
          </button>

          <form class="form-search">
            <button id="hide-form" type="button" class="btn-form">
              <span class="fa fa-arrow-left"></span>
            </button>

            <div class="input form-search__input">
              <input type="search" name="search" id="search">
            </div>

            <button id="reset-form" type="reset" class="btn-form">
              <span class="icon-cancel"></span>
            </button>
          </form>
          <a class="main-menu__link btn" href="#/">Home</a>
        </div>
      </nav>
    </div>`
  )
}