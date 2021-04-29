import { setTitle } from '../helpers/title.js'
import Component from '../prottoDom/Component.js'

const SearchPage = new Component({
  name: 'SearchPage',

  template: function (props = {}) {
    setTitle("Search")
    return (
      `<div class="container">
        <h1>This Is the SearchPage</h1>
      </div>`
    )
  }
})

export default SearchPage