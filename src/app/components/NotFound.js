import Component from '../prottoDom/Component.js';
import { stopLoader } from '../helpers/stopLoader.js'


const NotFound = new Component({
  name: 'notFound',

  template: function (props = {}) {
    stopLoader()
    return (
      `<div class="not-found--container">

      <div class="container_animation">
        <div class='stars'></div>
        <div class='stars2'></div>
      </div>

      <div class="not-found">
        <div class="number-code">
          <h3 class="not-found__code">
            4
          </h3>
          <div class="zero"></div>
          <h3 class="not-found__code">
            4
          </h3>
        </div>
        <p class="not-found__text">NOT FOUND</p>
      </div>

      <a class="btn not-found__btn" href="#/">HOME</a>
      </div>`
    )
  }
});

function goToNotFound() {
  location.hash = '#/not-found'
}

export { NotFound, goToNotFound }