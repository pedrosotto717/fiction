export default (function () {
  const events = []

  function parseHtml(html) {
    const tpl = document.createElement("div")
    tpl.insertAdjacentHTML("beforeend", html)
    return tpl
  }

  function renderAsNode(html) {
    const tpl = parseHtml(html)

    if (tpl.childElementCount === 1) {
      return tpl.firstElementChild.cloneNode(true)
    }

    const fragment = document.createDocumentFragment()
    Array.from(tpl.children).forEach(node => fragment.appendChild(node));
    return fragment
  }

  function htmlToNode(html) {
    const tpl = parseHtml(html)
    if (tpl.childElementCount === 1) {
      return tpl.firstElementChild.cloneNode(true)
    }
    return tpl
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
      element = this.renderAsNode(element)

    return containerElement.appendChild(element) ? true : false
  }


  /**
   * clean and remove the childrenElement of one Node
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
   * @param {function|callback|closure} handler
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
    if (events.includes(idEvent)) return false

    document.body.addEventListener(type, callback)
    events.push(idEvent)
    return true
  }

  return {
    addEventListener,
    htmlToNode,
    renderAsNode,
    render,
    clear,
    reset
  }
})();