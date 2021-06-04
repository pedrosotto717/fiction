import Component from "../prottoDom/Component.js";
import { makeBackDrop } from "../services/API.js";

const ModalImage = new Component({
  title: 'ModalImage',

  state: {
    imagePath: null
  },

  template: function (props = {}) {
    return (
      `<div class="modal-image">
        <div class="modal-image__container">
          <button class="modal-image__btn btn" id="btn-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path></g></svg>
          </button>
          <img class="modal-image__img" src="${makeBackDrop(this.state.imagePath, "w1280")}" alt="Image"/>
        </div>
      </div>`
    )
  },

  componentDidMount: function () {
    document.addEventListener('click', ev => {
      if (ev.target.matches('.modal-image__img')) return false

      const $modal = document.querySelector('.modal-image')
      if (!$modal) return false

      $modal.classList.remove('is-show')
    })

    document.addEventListener('click', ev => {
      if (ev.target.matches('.view-image') || ev.target.matches('.view-image *')) {
        const $modal = document.querySelector('.modal-image')

        if (!$modal) return false

        const _target = ev.target.matches('.view-image') ? ev.target : ev.target.closest('.view-image')
        const imagePath = _target.dataset.imagepath

        console.log(imagePath)


        this.setState({ imagePath })
        $modal.classList.add('is-show')
      }
    })
  }
})

export default ModalImage