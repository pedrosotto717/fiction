import Component from "../prottoDom/Component.js";

const ModalVideo = new Component({
  title: 'ModalVideo',

  state: {
    videoKey: null,
    play: false
  },

  template: function (props = {}) {
    const srcVideo = `https://www.youtube.com/embed/${this.state.videoKey}?rel=0&amp;showinfo=0&amp;autoplay=1`
    return (
      `<div class="modal-video">
          ${this.state.play
        ? `<div class="video-container">
                ${true === ''
          ? `<span class="modal-video__message">Unavailable Video</span>`
          : `<iframe class="modal-video__iframe" src=${srcVideo} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" __idm_id__="642651137"></iframe>`
        }
            <button class="modal-video__btn-close btn" id="btn-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5"><path d="M.75.75l13.5 13.5M14.25.75L.75 14.25"></path></g></svg>
            </button>
          </div>`

        : ''
      }
      </div>`
    )
  },

  componentDidMount: function () {
    document.addEventListener('click', ev => {
      if (ev.target.matches('.modal-video__iframe')) return false

      const $modal = document.querySelector('.modal-video')
      if (!$modal) return false

      this.setState({ play: false })
      $modal.classList.remove('is-show')
    })

    document.addEventListener('click', ev => {
      if (ev.target.matches('.video') || ev.target.matches('.video *')) {
        const $modal = document.querySelector('.modal-video')

        if (!$modal) return false

        const _target = ev.target.matches('.video') ? ev.target : ev.target.closest('.video')
        const videoKey = _target.dataset.videoKey

        this.setState({ play: true, videoKey })
        $modal.classList.add('is-show')
      }
    })
  }
})

export default ModalVideo