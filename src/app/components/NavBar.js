import Component from "../prottoDom/Component.js";
import Router from "../prottoDom/Router.js";

const Navbar = new Component({
  name: "NavBar",

  template: function (props = {}) {
    return (
      `<div class="nav-bar-container">
      <nav class="container nav-bar">
        <a href="#/" class="logo-title">
          <h1 class="fiction">Fiction</h1>
        </a>


        <div class="main-menu">

          <form class="form-search">
            <div class="input form-search__input">
              <input type="search" name="search" id="search" placeholder="Search Movie">
            </div>
            <button type="submit" class="btn btn-search">
            </button>
          </form>

          ${!Router.is('Home')
        ? `<a class="main-menu__link btn" href="#/">
              Home
            </a>` : ''}
        </div>
      </nav>
    </div>`
    )
  }
})

export default Navbar