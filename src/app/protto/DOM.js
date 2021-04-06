export default (function() {
  const events = []


  /**
   * Convert HTML's string to Node
   * @param {string} html
   * @param {number} presentation (0 to html, 1 to fragment, 2 wrapper into 'div')
   * @returns HTMLHtmlElement
   */
  function htmlToNode(html, presentation = 0) {
    const tpl = document.createElement("div")

    tpl.insertAdjacentHTML("beforeend", html)

    if (tpl.childElementCount === 1) {
      return tpl.firstElementChild.cloneNode(true)
    }

    if (presentation === 1) {
      const fragment = document.createDocumentFragment()
      Array.from(tpl.children).forEach(node => fragment.appendChild(node));
      return fragment
    } else if (presentation === 2) {
      return tpl
    }

    return html
  }


  /**
   * render element inside containerElement
   * @param {string|HTMLHtmlElement} element
   * @param {HTMLHtmlElement} containerElement
   */

  function render(element, containerElement) {
    let node = containerElement

    if (typeof containerElement === "string") {
      containerElement = document.querySelector(containerElement)
      if (containerElement === null) {
        console.warn(node + " isn't a HTMLHtmlElement")
        return false
      }
    }

    if (typeof element === "string")
      element = this.htmlToNode(element)

    return containerElement.appendChild(element) ? true : false
  }


  /**
   * clean and remove the childreElement of one Node
   * @param {string|HTMLHtmlElement} element
   */
  function clear(element) {
    if (typeof element === "string")
      element = document.querySelector(element)

    element.innerHTML = ""
    return element
  }


  /**
   * clean 'element' and render 'content' into 'element'
   * @param {string|HTMLHtmlElement} element
   * @param {string|HTMLHtmlElement} content
   */
  function reset(element, content) {
    this.clear(element)
    return this.render(content, element) ? true : false
  }


  /**
   * add one new 'event' al 'listener of events' of the DOM
   * @param {string} type
   * @param {function|callback|clousure} handler
   * @param {string} selector
   */
  function addEventListener(type, handler, selector = false) {
    let idEvent = `${type}-${handler.toString()}-${selector}`,
      callback = null

    if (selector === false) {
      callback = (ev) => {
        handler(ev)
      }
    } else {
      callback = (ev) => {
        if (ev.target.matches(selector)) {
          handler(ev)
        }
      }
    }

    if (events.includes(idEvent)) {
      return false
    }

    document.body.addEventListener(type, callback)
    events.push(idEvent)
    return true
  }

  return {
    addEventListener,
    htmlToNode,
    render,
    clear,
    reset
  }
})();