import Component from "../prottoDom/Component.js";

const LoadMore = new Component({
  name: "LoadMore",

  state: {
    isButton: true
  },

  template: function (props = {}) {

  },

  componentDidMount: function () {
    // if (this.state.isButton) {
    // compruebo cada vez que este en el viewport hago
    /** if(this.context.page + 1 < numResults)
     * this.pushContext({page: })
     * else
     * display-none al loader o button
     */
    // }
  }
});

export default LoadMore