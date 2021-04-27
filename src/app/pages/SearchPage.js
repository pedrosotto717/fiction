import Component from '../prottoDom/Component.js'

const SearchPage = new Component({
  name: 'SearchPage',

  template: function (props = {}) {
    return (
      `<div class="container">
        <h1>This Is the SearchPage</h1>
      </div>`
    )
  }
})

export default SearchPage