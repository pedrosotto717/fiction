import Component from '../prottoDom/Component.js';
import { stopLoader } from '../helpers/stopLoader.js'


const NotFound = new Component({
  name: 'notFound',

  template: function(props = {}) {
    stopLoader()
    return (
      `<div class="not-found--container">
        <div class="not-found">
          <h3 class="not-found__code">
            404
          </h3>
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