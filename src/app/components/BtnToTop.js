import Component from "../prottoDom/Component.js";

const BtnToTop = new Component({
  name: "BtnToTop",

  template: function (props = {}) {
    return (
      `<button class="btn btn-to-top">
      </button>`
    )
  },

  componentDidMount: function () {

    document.addEventListener("scroll", ev => {
      const limit = window.innerHeight + 100,
        $elemButton = document.querySelector('.btn-to-top') || null

      if ($elemButton === null) return false

      window.pageYOffset > limit
        ? $elemButton.classList.add('is-show')
        : $elemButton.classList.remove('is-show')
    });

    this.addEventListener('click', () => {
      window.scrollTo({
        behavior: "smooth",
        top: 0
      });
    });
  }
})


export default BtnToTop