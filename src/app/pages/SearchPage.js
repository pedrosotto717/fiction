import { setTitle } from '../helpers/title.js'
import Component from '../prottoDom/Component.js'
import MovieList from '../components/MovieList.js'


const SearchPage = new Component({
  name: 'SearchPage',

  template: function (props = {}) {
    setTitle("Search")
    return (
      `<main class="container">
        <h1>This Is the SearchPage</h1>
        ${MovieList.render()}
      </main>`
    )
  }
})

export default SearchPage