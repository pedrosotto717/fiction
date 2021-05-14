import Component from "../prottoDom/Component.js";
import { AppContext } from "../states/AppContext.js";

function clearNotFound() {
  const [_, setState] = AppContext.provider()
  setState({ notFound: false })
  setState({ loading: true })
}

const NotFound = new Component({
  name: 'notFound',

  useContext: AppContext.provider(),


  template: function (props = {}) {
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
  },

  componentWillMount: function () {
    console.log("WillMount")
    if (this.context.notFound) {
      console.log("NOTFOUND In True")
      this.pushContext({ loading: false })
    }

    this.addEventListener('click', ev => {
      console.log("CLICKED Go To Home")
      clearNotFound()
      // debugger
    }, '.not-found__btn')
  },

  componentWillUpdate: function () {
    if (this.context.notFound) {
      console.log("NOTFOUND In True")
      this.pushContext({ loading: false })
    }
  }
});

export default NotFound