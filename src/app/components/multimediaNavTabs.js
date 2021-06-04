import Component from "../prottoDom/Component.js";
import DOM from "../prottoDom/DOM.js";
import { makeBackDrop, placeHolderYoutube } from "../services/API.js";
import CarouselCasting from "./CarouselCasting.js";

const multimediaNavTabs = new Component({
  name: "multimediaNavTabs",

  template: function (props) {

    return (
      `<section class="media-nav container">
        <div class="media-nav__tabs">
          <button class="btn-video media-nav__tabs-item is-active" data-idnav="nav-videos">${props.videos.length} VIDEOS</button>
          <button class="btn-images media-nav__tabs-item" data-idnav="nav-images">${props.images.length}  PICTURES</button>
          <button class="btn-cast media-nav__tabs-item" data-idnav="nav-cast">CASTING</button>
        </div>

        <div class="media-nav__content">
          <div id="nav-videos" class="media-nav__content-item is-show">
            <ul class="video-list">
              ${props.videos.map(video => `
                <li class="video-list__item">
                  <button class="video video-list__btn" data-video-key="${video.key}">
                    <div class="video-list__img">
                      <img src="${placeHolderYoutube(video.key)}" alt="${video.name}"/>
                    </div>
                    <p class="video-list__name">${video.name}</p>
                    <span class="video-list__type">${video.type}</span>
                  </button>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div id="nav-images" class="media-nav__content-item">
            <ul class="grid-media__container">
              ${props.images.map(image => `
                <li class="grid-media__item view-image" data-imagepath=${image.file_path}>
                  <img class="grid-media__img image" src="${makeBackDrop(image.file_path, "w780")}" alt="BackDrop" data-path="${image.file_path}"/>
                </li>
              `).join('')}
            </ul>
          </div>
          
          <div id="nav-cast" class="media-nav__content-item">
            ${CarouselCasting.render({
        casts: props.cast
      })}
          </div>
        </div>
      </section>`
    )
  },

  componentWillMount: function () {

    const clearClass = (selector, className) => {
      const $listItems = document.querySelectorAll(selector)
      $listItems.forEach($el => $el.classList.remove(className))
    }

    DOM.addEventListener('click', ev => {
      if (!ev.target.matches('.media-nav__tabs-item')) return false
      const id = ev.target.dataset.idnav

      clearClass('.media-nav__content-item', 'is-show')
      clearClass('.media-nav__tabs-item', 'is-active')

      const $element = document.querySelector(`#${id}`)
      if (id === "nav-videos")
        $element.classList.add('stop-animation')

      ev.target.classList.add("is-active")
      $element.classList.add('is-show')
      CarouselCasting.state.carousel.updatingCarousel()
    });
  }
});

export default multimediaNavTabs